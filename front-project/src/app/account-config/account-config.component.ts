import { ChangeDetectionStrategy, Component,ChangeDetectorRef } from '@angular/core';
import { Auth, User } from '@angular/fire/auth';
import { doc, Firestore } from '@angular/fire/firestore';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { updateDoc } from '@firebase/firestore';
import { UserService } from '../user.service';
import { Storage,  ref, uploadBytes } from '@angular/fire/storage';
import { getDownloadURL } from 'firebase/storage';
import { Observable, of, switchMap } from 'rxjs';
import { MiahootUser } from '../QcmDefinitions';

@Component({
  selector: 'app-account-config',
  templateUrl: './account-config.component.html',
  styleUrls: ['./account-config.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountConfigComponent {
  user !: MiahootUser;
  preview : Observable<string>;
  imageUrl!: string;
  affichage: boolean = false;


  public fg: FormGroup<{ 
    name:      FormControl<string>, 
    photoURL:  FormControl<string>,
    photoFile: FormControl<File | undefined> 
    }>;
  
  constructor(private ms : UserService,
              private fs : Firestore, 
              private fb: FormBuilder,
              private storage: Storage,
              private auth: Auth,
              private cd: ChangeDetectorRef,
              ) {

   
    this.ms.obsMiahootUser$.subscribe(
      u => {
        if( u === undefined){
        this.fg.controls.name.setValue("")
        this.fg.controls.photoURL.setValue("https://cdn-icons-png.flaticon.com/512/1077/1077012.png")
        this.fg.controls.photoFile.setValue(undefined)
      } else {
        this.fg.controls.name.setValue(u.name)
        this.fg.controls.photoURL.setValue(u.photoUrl)
        this.fg.controls.photoFile.setValue(undefined)
      }
    }
    )
    async (u : User) => {
      await updateDoc(doc(this.fs,"users",u.uid),{
        foo : 'bar'
      })
    }
    
    this.fg = this.fb.nonNullable.group({
      name: [""],
      photoURL: [""],
      photoFile: [undefined as undefined | File]
    })

    this.preview = this.fg.controls.photoFile.valueChanges.pipe(
      switchMap(file => {
        if (file) {
          return loadFileUrl(file);
        } else {
          return of("");
        }
      })
    )
  }


  
  async update(){
    await this.uploadPhoto();
    this.ms.update({
      name: this.fg.controls.name.value,
      photoUrl: this.fg.controls.photoURL.value,
    })
    this.cd.detectChanges();
    
  }

  async uploadPhoto(){
    if(this.fg.value.photoFile !== undefined) {
      try {
        const ab = await loadFile(this.fg.value.photoFile);
        const storageRef = ref(this.storage, `photos/${this.auth.currentUser!.uid}`);
        const uploadTask = await uploadBytes(storageRef, ab);
        uploadTask.ref;
        const url = await getDownloadURL(uploadTask.ref);
        this.fg.controls.photoURL.setValue(url)
      } catch (err) {
        console.log(err);
      }
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    event.preventDefault(); // empêche le navigateur de naviguer vers l'URL de l'image
    this.affichage = true;
    const dataTransfer = event.dataTransfer;
    if (!dataTransfer) {
    return;
  }
  const file = dataTransfer.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imageUrl = reader.result as string;
      this.fg.controls.photoURL.setValue(this.imageUrl)
      this.cd.detectChanges(); // force la détection de changements dans la vue
    };
    reader.readAsDataURL(file);
  }
}

async function loadFileUrl(file: File) : Promise<string>{
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      resolve(reader.result as string);
      
    }
    reader.onerror = (e) => {
      reject(e);
    }
    reader.readAsDataURL(file);
  })
}

async function loadFile(file: File) : Promise<ArrayBuffer>{
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      resolve(reader.result as ArrayBuffer);
      
    }
    reader.onerror = (e) => {
      reject(e);
    }
    reader.readAsArrayBuffer(file);
  })
}




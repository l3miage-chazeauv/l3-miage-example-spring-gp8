import { ChangeDetectionStrategy, Component, Output,ChangeDetectorRef } from '@angular/core';
import { Auth, User } from '@angular/fire/auth';
import { doc, Firestore } from '@angular/fire/firestore';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { updateDoc } from '@firebase/firestore';
import { DataService, MiahootUser } from '../miahoot.service';
import { Storage,  ref, uploadBytes } from '@angular/fire/storage';
import { getDownloadURL } from 'firebase/storage';
import { Observable, of, switchMap } from 'rxjs';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-account-config',
  templateUrl: './account-config.component.html',
  styleUrls: ['./account-config.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountConfigComponent {
  user !: MiahootUser;
  preview : Observable<string>;

  public fg: FormGroup<{ 
    name:      FormControl<string>, 
    photoURL:  FormControl<string> 
    photoFile: FormControl<File | undefined> 
    }>;
  
  constructor(private dataUserService : DataService,
              private fs : Firestore, 
              private fb: FormBuilder,
              private storage: Storage,
              private auth: Auth,
              private cd: ChangeDetectorRef) {
            
    this.dataUserService.obsMiahootUser$.subscribe(
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
    
    this.fg = fb.nonNullable.group({
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
    this.dataUserService.update({
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

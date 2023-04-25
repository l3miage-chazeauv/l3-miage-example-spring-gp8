package fr.uga.l3miage.example.repository;

import fr.uga.l3miage.example.exception.rest.TestEntityNotDeletedRestException;
import fr.uga.l3miage.example.models.Miahoot;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
public class MiahootRepository implements CRUDRepository<Long, Miahoot> {
    private EntityManager entityManager;

    @Autowired
    public MiahootRepository(EntityManager entityManager){
        this.entityManager = entityManager;
    }

    @Override
    public Miahoot save(Miahoot enitiy) {
        return null;
    }

    @Override
    public Miahoot get(Long id) {
        return null;
    }

    @Override
    public void delete(Miahoot entity) throws TestEntityNotDeletedRestException {

    }

    @Override
    public List<Miahoot> all() {
        return null;
    }
}

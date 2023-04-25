package fr.uga.l3miage.example.repository;

import fr.uga.l3miage.example.exception.rest.TestEntityNotDeletedRestException;

import java.util.List;

/**
 * Base interface to having consistent naming.
 * @param <I>
 * @param <E>
 */
public interface CRUDRepository<I,E> {
    E save(E enitiy);

    E get(I id);

    void delete(E entity) throws TestEntityNotDeletedRestException;

    List<E> all();
}

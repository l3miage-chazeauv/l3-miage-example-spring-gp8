package fr.uga.l3miage.example.controller;


import fr.uga.l3miage.example.mapper.MiahootMapper;
import fr.uga.l3miage.example.service.MiahootService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;



@RestController
public class MiahootController {

    private final MiahootService miahootService;
    private final MiahootMapper miahootMapper;

    @Autowired
    public MiahootController(MiahootService miahootService, MiahootMapper miahootMapper) {
        this.miahootService = miahootService;
        this.miahootMapper = miahootMapper;
    }
}

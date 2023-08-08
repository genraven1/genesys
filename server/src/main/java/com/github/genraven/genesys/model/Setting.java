package com.github.genraven.genesys.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "setting")
@Data
public class Setting {
    
    public Setting(final String name) {
        this.name = name;
    }
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    
    @Column(name = "name")
    private String name;
    
    @Column(name = "magic")
    private boolean magic;

    protected Setting() {}
}
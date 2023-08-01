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
    
    private String name;
    
    private boolean magic;

    protected Setting() {}
}
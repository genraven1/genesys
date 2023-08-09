package com.github.genraven.genesys.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "setting")
@Getter
@Setter
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

    @Column(name = "current")
    private boolean current;

    protected Setting() {}
}
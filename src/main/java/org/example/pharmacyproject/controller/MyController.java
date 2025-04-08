package org.example.pharmacyproject.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MyController {

    @GetMapping("/api/hello")
    public String getHello(){
        return "Hello there!";
    }

    @GetMapping("/api/multiply")
    public int multiply(@RequestParam int a, @RequestParam int b){
        return a * b;
    }


    @GetMapping("/api/add/{a}/{b}")
    public int add(@PathVariable("a") int a, @PathVariable("b") int b){
        return a+b;
    }
}

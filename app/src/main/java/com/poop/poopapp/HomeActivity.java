package com.poop.poopapp;

import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.widget.EditText;
import android.widget.GridView;

public class HomeActivity extends AppCompatActivity {
    private EditText searchBar;
    private GridView homeGrid;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_home);
        searchBar = (EditText) findViewById(R.id.searchBar);

        homeGrid = (GridView) findViewById(R.id.homeGrid);
    }

}

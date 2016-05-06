package com.poop.poopapp.activity;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.SearchView;
import android.util.Log;
import android.view.View;
import android.widget.AdapterView;
import android.widget.GridView;
import android.widget.Toast;

import com.poop.poopapp.R;
import com.poop.poopapp.component.PhotoGridAdapter;

public class HomeActivity extends AppCompatActivity {
    private SearchView searchBar;
    private GridView homeGrid;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        Log.d("FDSA", "ASDF");
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_home);

        searchBar = (SearchView) findViewById(R.id.searchView);
        searchBar.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
            }
        });
        homeGrid = (GridView) findViewById(R.id.homeGrid);
        homeGrid.setAdapter(new PhotoGridAdapter(this));
        homeGrid.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            public void onItemClick(AdapterView<?> parent, View v,
                                    int position, long id) {
                Toast.makeText(HomeActivity.this, "" + position,
                        Toast.LENGTH_SHORT).show();
            }
        });
    }

}

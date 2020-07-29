package com.example.project;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.text.TextUtils;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

public class CreateUser extends AppCompatActivity {
    private EditText firstName;
    private EditText lastName;
    private EditText weight;
    private TextView waterConsume;
    SharedPreferences sharedPreferences;
    static final String FName="fNameKey";
    static final String LName="lNameKey";
    static final String Weight="weightKey";
    static final String waterConsumed="waterKey";
    public static final String SHARED_PREFS = "sharedPrefs";


    @Override
    public void onCreate(Bundle bundle){
        super.onCreate(bundle);
        setContentView(R.layout.get_user_info);
        Button start = findViewById(R.id.btnStart);
        start.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(getApplicationContext(), MainActivity.class);
                if (checkUserInput()) {
                    saveData();
                    startActivity(intent);
                    finish();
                }
            }
        });
    }

    /**
     * Checks if user entered valid input when creating user account.
     * @return boolean
     */
    public boolean checkUserInput() {
        firstName = findViewById(R.id.editTextFirstName);
        lastName = findViewById(R.id.editTextLastName);
        weight = findViewById(R.id.editTextWeight);
        waterConsume = findViewById(R.id.waterPercentage);

        if (TextUtils.isEmpty(firstName.toString().trim())) {
            Toast.makeText(this, "You must enter valid input.", Toast.LENGTH_LONG).show();
            return false;
        }
        if (TextUtils.isEmpty(lastName.toString().trim())) {
            Toast.makeText(this, "You must enter valid input.", Toast.LENGTH_LONG).show();
            return false;
        }
        System.out.println(weight.toString().trim());
        if (TextUtils.isEmpty(weight.toString().trim()) || !isDouble(weight.getText().toString().trim())) {
            Toast.makeText(this, "You must enter valid input.", Toast.LENGTH_LONG).show();
            return false;
        }
        return true;
    }

    /**
     * Helper function to validate user input. Used to check if weight entered is a double.
     * @param s
     * @return
     */
    public static boolean isDouble(String s) {
        try {
            Double.parseDouble(s);
        } catch (NumberFormatException | NullPointerException nfe) {
            return false;
        }
        return true;
    }

    /**
     * Saves data that was entered by the user to be used by other Activities.
     */
    public void saveData(){
        String fName = firstName.getText().toString().trim();
        String lName = lastName.getText().toString().trim();
        String  wValue = weight.getText().toString().trim();
        sharedPreferences = getSharedPreferences(SHARED_PREFS, MODE_PRIVATE);
        SharedPreferences.Editor editor = sharedPreferences.edit();
        editor.putString(FName, fName);
        editor.putString((LName), lName);
        editor.putString(Weight, wValue);
        editor.apply();
    }
}

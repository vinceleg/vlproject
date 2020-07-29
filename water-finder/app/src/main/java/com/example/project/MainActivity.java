package com.example.project;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;

import android.app.Dialog;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.preference.PreferenceManager;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.ListView;
import android.widget.RadioButton;
import android.widget.TextView;
import android.widget.Toast;

import com.google.android.gms.common.ConnectionResult;
import com.google.android.gms.common.GoogleApiAvailability;
import com.google.gson.Gson;

import java.text.DecimalFormat;
import java.util.prefs.PreferenceChangeEvent;

public class MainActivity extends AppCompatActivity {
    TextView dailyWaterPercentage;
    boolean userCreated;
    double waterDrankSoFar;
    double userWeight;
    public static final String SHARED_PREFS = "sharedPrefs";
    public static final String USER_OBJECT = "user object";
    public static final String SWITCH1 = "switch1";
    public static double waterConstant = 0.033;
    SharedPreferences sharedPreferences;
    static final String FName = "fNameKey";
    static final String LName = "lNameKey";
    static final String Weight = "weightKey";
    static final String waterConsumed="waterKey";
    static final String userWater="userWaterKey";
    RadioButton radioButtonTwoFifty;
    RadioButton radioButtonOneThousand;
    private static final String TAG = "MainActivity";
    private static final int ERROR_DIALOG_REQUEST = 9001;
    AlertDialog.Builder dialogBuilder;
    AlertDialog alertDialog;
    TextView userWaterAmount;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        loadData();
        sharedPreferences = getSharedPreferences(SHARED_PREFS, MODE_PRIVATE);
        SharedPreferences.Editor editor = sharedPreferences.edit();

        dailyWaterPercentage = findViewById(R.id.waterPercentage);
        System.out.println(dailyWaterPercentage.getText().toString());
        editor.putString(waterConsumed, dailyWaterPercentage.getText().toString());

        System.out.println("The value is" + dailyWaterPercentage);
        TextView t = findViewById(R.id.textView);

        System.out.println(t.getText().toString());
        if (isServiceOK()) {
            init();
        }

    }

    /**
     * Initialize an image button that will send users to the map of water fountains when clicked.
     */
    private void init() {
        ImageButton btnMap = (ImageButton) findViewById(R.id.mapIcon);
        btnMap.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(MainActivity.this, MapsActivity.class);
                startActivity(intent);
            }
        });
    }

    /**
     * Check if Google Play Services version is compatible.
     * @return boolean
     */
    public boolean isServiceOK() {
        Log.d(TAG, "isServicesOK: checking google services version");
        int available = GoogleApiAvailability.getInstance().isGooglePlayServicesAvailable(MainActivity.this);
        if (available == ConnectionResult.SUCCESS) {
            Log.d(TAG, "isServicesOK: Google Play Services is working");
            return true;
        } else if (GoogleApiAvailability.getInstance().isUserResolvableError(available)){
            Log.d(TAG, "isServicesOK: an error occurred but we can fix it");
            Dialog dialog = GoogleApiAvailability.getInstance().getErrorDialog(MainActivity.this, available, ERROR_DIALOG_REQUEST);
            dialog.show();
        } else {
            Toast.makeText(this, "You can't make map requests", Toast.LENGTH_SHORT).show();
        }
        return false;
    }

    /**
     * Log out user and directs user back to create a user page.
     */
    public void logOut(View view) {
        System.out.println("Remove");
        sharedPreferences.edit().clear().commit();
        System.out.println(sharedPreferences.contains(FName));
        System.out.println(sharedPreferences.getAll());
        Intent intent = new Intent(MainActivity.this, CreateUser.class);
        startActivity(intent);
        finish();
    }

    /**
     * Use user's entered weight to calculated their target water intake amount for the day.
     */
    private void loadData() {
        userWaterAmount = findViewById(R.id.waterAmount);
        System.out.println(userWaterAmount.getText().toString());

        sharedPreferences = getSharedPreferences(SHARED_PREFS, MODE_PRIVATE);
        if (sharedPreferences.contains(FName) && sharedPreferences.contains(LName)) {
            userWeight = Double.valueOf(sharedPreferences.getString(Weight, "DEFAULT"));
            double dailyWaterIntake = userWeight * waterConstant;
            DecimalFormat df = new DecimalFormat("#.###");
            dailyWaterIntake = Double.valueOf(df.format(dailyWaterIntake));
            String waterRecommended = "Target: " + dailyWaterIntake + " Liters/day ";
            userWaterAmount.setText(waterRecommended);

            System.out.println(dailyWaterIntake);
            System.out.println(userWeight);
            System.out.println(sharedPreferences.contains(FName));
            System.out.println(sharedPreferences.getAll());
        } else {
            Intent intent = new Intent(MainActivity.this, CreateUser.class);
            startActivity(intent);
            finish();
        }
    }

    /**
     * Allow user to log water they consumed by displaying a dialog view.
     */
    public void addDrink(View view){
        dialogBuilder = new AlertDialog.Builder(this);

        LayoutInflater inflater = getLayoutInflater();

        final View dialogView = inflater.inflate(R.layout.add_water_layout, null);
        dialogBuilder.setView(dialogView);

        radioButtonTwoFifty = (RadioButton) dialogView.findViewById(R.id.twoFifty);
        radioButtonOneThousand = (RadioButton) dialogView.findViewById(R.id.oneThousand);

        alertDialog = dialogBuilder.create();
        alertDialog.show();
        System.out.println("Add");
        System.out.println(sharedPreferences.getAll());
    }

    /**
     * Update the user's intake amount.
     */
    public void updateWaterIntake(View view) {
        double temp = Double.valueOf(dailyWaterPercentage.getText().toString());
        SharedPreferences.Editor editor = sharedPreferences.edit();
        if (radioButtonTwoFifty.isChecked()) {
            temp = Double.valueOf(dailyWaterPercentage.getText().toString()) + 0.25;
            System.out.println(temp);
            editor.apply();
        } else if (radioButtonOneThousand.isChecked()){
            temp = Double.valueOf(dailyWaterPercentage.getText().toString()) + 1;
            editor.putString(waterConsumed, String.valueOf(temp));
            editor.apply();
        }
        dailyWaterPercentage.setText(String.valueOf(temp));
        alertDialog.dismiss();
    }
}

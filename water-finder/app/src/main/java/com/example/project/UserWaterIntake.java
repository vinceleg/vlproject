package com.example.project;

public class UserWaterIntake {

    int gender;
    double height;
    double weight;
    int age;
    double dailyWaterIntake;
    public static double waterConstant = 0.033;
    boolean userCreated = false;
    private static UserWaterIntake user = null;

    public UserWaterIntake(){}

    public UserWaterIntake(double weight){
        this.weight = weight;
        this.dailyWaterIntake = generateDailyWaterIntake();

    }

    public static UserWaterIntake getInstance()
    {
        if (user== null)
        {
            user = new UserWaterIntake();
        }
        return user;
    }

    public double getWeight() {
        return weight;
    }

    public void setWeight(float weight) {
        this.weight = weight;
    }

    public double getDailyWaterIntake(){
        return this.dailyWaterIntake;
    }

    public double generateDailyWaterIntake(){
        return this.weight * waterConstant;
    }

    @Override
    public String toString(){
        return "User [weight=" + getWeight() + "dailyWaterIntake=" + getDailyWaterIntake() + "]";
    }
}

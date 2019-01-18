"""Battle functions."""
from student import Student
from die import Die
from character import Character


def roll_1d10() -> int:
    """Roll a 1d10 and return the value.

    This will be used represent a 10% chance.

    PARAM: N/A
    PRECONDITION: N/A
    POSTCONDITION: N/A
    RETURN: a random integer from 1 to 10
    >>> import random
    >>> random.seed(1)
    >>> roll_1d10()
    3
    """
    ten_percent = Die(10)
    ten_percent.roll_die()
    chance = ten_percent.get_value()
    return chance


def regain_hp(player: Character):
    """Add 1 to player's HP and print a message if player's HP is under 10.

    Every time a character moves and does not encounter a student, they gain 1 hp.

    PARAM: player is a class instance
    PRECONDITION: player is a class instance
    POSTCONDITION: N/A
    RETURN: N/A
    >>> player = Character("Vincent")
    >>> player.hp = 8
    >>> regain_hp(player)
    Gained 1 hp!
    <BLANKLINE>
    """
    if player.hp < 10:  # adding 1 hp to player with each move
        player.hp += 1
        print("Gained 1 hp!\n")


def encounter_student_chance(player: Character):
    """Simulate a player encountering a student or a player moving a map without encounter a student.

    Simulates a 10% chance of encountering a student. If encountered, player can choose how to interact with
    student. Else, player will move on a map and regain hp if health is under 10.

    PARAM: player is a class instance
    PRECONDITION: player is a class instance
    POSTCONDITION: N/A
    RETURN: N/A
    """
    encounter = roll_1d10()
    flee = roll_1d10()
    if encounter == 10:
        interaction_with_student(player, flee)
    else:
        regain_hp(player)


def display_player_and_student_health(player: Character, opponent: Student):
    """Print message that displays the player's and student's health.

    Will be used to display hp before a battle occurs.

    PARAM: player and opponent are class instances
    PRECONDITION: player and opponent are class instances
    POSTCONDITION: N/A
    RETURN: N/A
    """
    print(player.name.title() + ": " + str(player.hp) + "HP")  # display player hp
    print("Student: " + str(opponent.hp) + "HP\n")  # display student hp


def check_student_death(opponent: Student):
    """Print a message if student has less than 0 hp.

    If student died during battle, this message will print before a player moves around the map again.

    PARAM: opponent is a class instance
    PRECONDITION: opponent is a class instance
    POSTCONDITION: N/A
    """
    if opponent.hp <= 0:
        print("Student has died.\n\n"
              "One step closer to the co-op spot..\n"
              "Let's keep moving.\n")


def player_attacks_student(player: Character, opponent: Student):
    """Simulate a player attacking a student.

    PARAM: player and opponent are class instances
    PRECONDITION: player and opponent are class instances
    POSTCONDITION: student health will decrease based on player's attack damage
    RETURN: N/A
    """
    player.player_damage = player.get_attack_damage()
    opponent.hp -= player.player_damage
    print(player.name.title() + " did " + str(player.player_damage) + " damage to the Student")
    print("Student has " + str(opponent.hp) + " HP left")


def student_attacks_player(player: Character, opponent: Student):
    """Simulate a student attacking a player.

        PARAM: player and opponent are class instances
        PRECONDITION: player and opponent are class instances
        POSTCONDITION: player health will decrease based on student's attack damage
        RETURN: N/A
        """
    opponent.student_damage = opponent.get_student_attack_damage()
    player.hp -= opponent.student_damage
    print("Student did " + str(opponent.student_damage) + " damage to " + player.name.title())
    print(player.name.title() + " has " + str(player.hp) + " HP left")


def interaction_with_student(player: Character, flee: int):
    """Simulate a player encountering a student and cue user to fight or run away.

    If user chooses to fight, they will battle to the death. If user chooses to run away, user will run but
    have a 10% chance of being attacked by the student before running. If user input is invalid, a warning message will
    be printed.

    PARAM: player is a class instance and flee is a random int
    PRECONDITION: player is a class instance and flee is a random int
    POSTCONDITION: if user picks fight, a battle will happen. if user picks run, they will go back to the map.
    RETURN: N/A
    """
    while True:
        choice = input("\nA student appeared! Fight or run away? ")
        choice = choice.lower()
        a_student = Student()
        if choice == "fight":
            battle_to_death(player, a_student)
            break
        elif choice == "run away" or choice == "run":
            if flee == 10:
                student_flee_attack(player, a_student)
            if player.hp <= 0:
                break
            player.display_flee_message()
            break
        else:
            print("Invalid choice, try again!")


def battle_to_death(player: Character, opponent: Student):
    """Simulate a battle to death with a student.

    If user chooses to fight a student, this will simulate their battle to death.

    PARAM: player and opponent are class instances
    PRECONDITION: player and opponent are class instances
    POSTCONDITION: if player has less than 0 hp, game will end.
                   if student has less than 0 hp, game will continue.
    RETURN: N/A
    """
    display_player_and_student_health(player, opponent)
    while player.hp > 0 and opponent.hp > 0:
        player_attacks_student(player, opponent)

        if opponent.hp <= 0:  # checks if student has died, if not, battle continues
            break

        else:
            student_attacks_player(player, opponent)

    check_student_death(opponent)


def student_flee_attack(player: Character, opponent: Student):
    """Simulate a student attacking a player before the player flees.

    PARAM: player and opponent are class instances
    PRECONDITION: player and opponent are class instances
    POSTCONDITION: N/A
    RETURN: N/A
    """
    opponent.student_damage = opponent.get_student_flee_attack_damage()
    player.hp -= opponent.student_damage
    print("\nStudent sucker punched you before you ran away!")
    print("Student did " + str(opponent.student_damage) + " damage to " + player.name.title())
    print(player.name.title() + " has " + str(player.hp) + " HP left\n")

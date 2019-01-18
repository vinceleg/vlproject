"""Game functions."""
import doctest
from character import Character
import map
import battle
import save_and_load_file
import movement_commands


def display_game_scenario():
    """Print the game scenario.

    PRECONDITION: N/A
    POSTCONDITION: N/A
    RETURN: N/A
    """
    print("You are a student attending BCIT's CST program. CST decided to have some fun \n"
          "and are having their students battle it out Hunger Games style for the last co-op \n"
          "spot. You've been knocked out and woke up on an island. You don't know how many \n"
          "students are with you on the island or when the co-op spot will be yours. All you \n"
          "can do is fight and beat every student until the spot is yours.")


def start_game_menu(load: dict) -> Character:
    """Cue the user to select a game mode and enter a character name to create or load a Class instance.

    If user selects new game, their following character name input will be used to create a new character.
    If user selects load game, their following character name input will be used to see if the player is returning.
    If they are returning, their player info will be loaded, else an error message will be printed and loop
    the user back to the beginning.

    PARAM: load is a json file as a dictionary
    PRECONDITION: load is a json file as a dictionary
    POSTCONDITION: if character name exists, file will be loaded
    RETURN: a new class instance or restart the while loop until a valid input is entered
    """
    while True:
        print("1) Start new game")
        print("2) Load game")
        start_game_option = input("Option(1 or 2): ")

        if start_game_option not in ("1", "2"):
            print("Not a valid option! Enter '1' or '2'.\n")
            continue

        new_player = Character(input("\nEnter your character's name: "))

        if start_game_option == "1":
            print("\nWelcome " + new_player.name.title() + "!\n")
            display_game_scenario()
            return new_player

        elif start_game_option == "2":
            if new_player.name.title() == load['name']:
                save_and_load_file.load_data(new_player, load)
                return new_player
            else:
                print("Your character does not exist!\n")
                continue

        else:
            print("Not a valid option! Enter '1' or '2'.\n")
            continue


def quit_game(user_input: str, player: Character) -> bool:  # if input is quit
    """Save a user's character and return True if a user's types 'quit'.

    Will be used to exit the game when a player inputs 'quit'.

    PARAM: user_input is a string and player is a class instance
    PRECONDITION: user_input is a string and player is a class instance
    POSTCONDITION: N/A
    RETURN: return True as a bool
    >>> user_input = 'quit'
    >>> player = Character("Vincent")
    >>> quit_game(user_input, player)
    Game saved!
    True
    """
    if user_input == "quit":
        data = save_and_load_file.save_player_data(player)
        save_and_load_file.save_file(data)
        print("Game saved!")
        return True


def check_end_game(player: Character) -> bool:
    """Return False if player has less than 0 hp or return True.

    Will be used to end game if player runs out of hp.

    PARAM: player is a class instance
    PRECONDITION: player is a class instance
    POSTCONDITION: N/A
    RETURN: False if player has less than 0 hp or True if player has hp remaining
    >>> player = Character("Vincent")
    >>> check_end_game(player)
    True
    >>> player = Character("Vincent")
    >>> player.hp = 0
    >>> check_end_game(player)
    Vincent has died and will never get that co-op spot.
    GAME OVER
    False
    """
    if player.hp <= 0:  # ends game if player is dead
        print(player.name.title() + " has died and will never get that co-op spot.\n"
              "GAME OVER")
        return False
    else:
        return True


def active_game(new_player: Character, the_map: list):
    """Simulate a SUD game's contents.

    Game will be active as long as player is alive. Game ends if player quits or dies.

    PARAM: player is a class instance and the_map is a list
    PRECONDITION: player is a class instance and the_map is a list
    POSTCONDITION: if player types 'quit' or has 0 hp, game/program ends
    RETURN: N/A
    """
    continue_playing = True  # game will be active while this is true
    while continue_playing:
        move = movement_commands.get_player_command()
        check_bounds = movement_commands.boundary_check(new_player, move)  # check boundaries before completing move

        if check_bounds is True:  # player will go out of bounds with move
            print("Can't go that way! Enter another direction!\n")
            continue
        else:
            user_quit = quit_game(move, new_player)
            if user_quit is True:  # checks if player typed 'quit' or a move
                break
            else:
                player_movement = movement_commands.movement(new_player, move)
                if player_movement is False:
                    continue

        map.update_map(the_map, new_player)  # updates player's position on map
        battle.encounter_student_chance(new_player)  # chance of encountering student and fighting student

        check = check_end_game(new_player)  # checks if player still has HP remaining
        if check is False:
            continue_playing = False


def game_loop():
    """Simulate a SUD game.

    PRECONDITION: N/A
    POSTCONDITION: N/A
    RETURN: N/A
    """
    print("###### CO-OP HUNGER GAMES ######")
    loaded_file = save_and_load_file.load_file()  # loaded json file; used to see if player is a returning player
    new_player = start_game_menu(loaded_file)  # created or loaded player

    the_map = []
    map.make_the_map(the_map, new_player)  # prints map with player on it
    active_game(new_player, the_map)


def main():
    """Execute the program."""
    pass


if __name__ == "__main__":
    main()
    doctest.testmod()

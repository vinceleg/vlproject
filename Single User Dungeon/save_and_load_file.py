"""Saving and loading file functions."""
import json
from character import Character


def save_file(data: dict):
    """Save a character's data to a json file.

    PARAM: data is a dictionary
    PRECONDITION: data is a dictionary
    POSTCONDITION: N/A
    RETURN: N/A
    """
    filename = 'data.json'
    with open(filename, 'w') as file_object:
        json.dump(data, file_object)


def save_player_data(new_player: Character) -> dict:
    """Store a character's data and return it as a dictionary.

    PARAM: new_player as a class instance
    PRECONDITION: new_player as a class instance
    POSTCONDITION: N/A
    RETURN: data as a dictionary
    >>> player = Character("Vincent")
    >>> save_player_data(player)
    {'name': 'Vincent', 'hp': 10, 'x_coord': 2, 'y_coord': 2, 'prev_x_coord': 2, 'prev_y_coord': 2}
    >>> player = Character("")
    >>> save_player_data(player)
    {'name': '', 'hp': 10, 'x_coord': 2, 'y_coord': 2, 'prev_x_coord': 2, 'prev_y_coord': 2}
    """

    data = {'name': new_player.name.title(), 'hp': new_player.hp, 'x_coord': new_player.x,
            'y_coord': new_player.y, 'prev_x_coord': new_player.previous_x,
            'prev_y_coord': new_player.previous_y}
    return data


def load_file() -> dict:
    """Load a character's json file.

    Will be used to check if a player has a saved file for the game. If there is, the data will be returned.
    If no previous file found, fail silently.

    PRECONDITION: N/A
    POSTCONDITION: N/A
    RETURN: return data if file found
    """
    try:
        filename = 'data.json'
        with open(filename) as file_object:
            data = json.load(file_object)
    except FileNotFoundError:
        pass
    else:
        return data


def load_data(player: Character, loaded_player: dict):
    """Load a character's data.

    This is used to load a saved player's information into the game and greet them.

    PARAM: player is a class instance and loaded_player is a dictionary
    PRECONDITION: player is a class instance and loaded_player is a dictionary
    POSTCONDITION: N/A
    RETURN: N/A
    """
    player.x = loaded_player['x_coord']
    player.y = loaded_player['y_coord']
    player.hp = loaded_player['hp']
    player.previous_x = loaded_player['prev_x_coord']
    player.previous_y = loaded_player['prev_y_coord']
    print("\nWelcome back " + player.name.title() + "!\n"
          "Now to defeat more students for that co-op spot!")

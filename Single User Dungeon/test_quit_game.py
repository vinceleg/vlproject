from unittest import TestCase
from character import Character
from game import quit_game


class TestQuitGame(TestCase):

    def test_quit_game_player_input_quit(self):
        user_input = 'quit'
        player = Character("Vincent")
        self.assertEqual(True, quit_game(user_input, player))

from unittest import TestCase
from character import Character
from game import check_end_game


class TestCheckEndGame(TestCase):

    def test_check_end_game_player_is_alive(self):
        player = Character("Vincent")
        self.assertEqual(True, check_end_game(player))

    def test_check_end_game_player_is_dead(self):
        player = Character("Vincent")
        player.hp = 0
        self.assertEqual(False, check_end_game(player))

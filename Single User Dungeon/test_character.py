from unittest import TestCase
from character import Character


class TestCharacter(TestCase):

    def setUp(self):
        self.test_character = Character('Vincent')

    def test_character_get_name(self):
        self.assertEqual('Vincent', self.test_character.name)

    def test_character_get_hp(self):
        self.assertEqual(10, self.test_character.get_hp())

    def test_character_get_x_coordinate(self):
        self.assertEqual(2, self.test_character.get_x_coord())

    def test_character_get_y_coordinate(self):
        self.assertEqual(2, self.test_character.get_y_coord())

    def test_character_get_previous_x_coordinate(self):
        self.assertEqual(2, self.test_character.get_previous_x_coord())

    def test_character_get_previous_y_coordinate(self):
        self.assertEqual(2, self.test_character.get_previous_y_coord())

    def test_character_get_player_damage(self):
        self.assertEqual(0, self.test_character.player_damage)

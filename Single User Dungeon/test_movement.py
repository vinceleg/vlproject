from unittest import TestCase
from movement_commands import movement
from character import Character


class TestMovement(TestCase):
    def test_movement_invalid_move(self):
        player = Character("Vincent")
        self.assertFalse(movement(player, 'ew'))

    def test_movement_successful_move(self):
        player = Character("Vincent")
        self.assertIsNone(movement(player, 'n'))
from unittest import TestCase
from movement_commands import boundary_check
from character import Character


class TestBoundaryCheck(TestCase):
    def test_boundary_check_successful(self):
        self.assertTrue(True)

    def test_boundary_check_move_within_boundary(self):
        player = Character('Vincent')
        self.assertIsNone(boundary_check(player, 'n'))

    def test_boundary_check_move_outside_boundary_x_north(self):
        player = Character('Vincent')
        player.x = 0
        self.assertTrue(boundary_check(player, 'n'))

    def test_boundary_check_move_outside_boundary_x_south(self):
        player = Character('Vincent')
        player.x = 4
        self.assertTrue(boundary_check(player, 's'))

    def test_boundary_check_move_outside_boundary_y_west(self):
        player = Character('Vincent')
        player.y = 0
        self.assertTrue(boundary_check(player, 'w'))

    def test_boundary_check_move_outside_boundary_y_east(self):
        player = Character('Vincent')
        player.y = 4
        self.assertTrue(boundary_check(player, 'e'))

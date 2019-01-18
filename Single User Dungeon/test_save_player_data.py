from unittest import TestCase
from character import Character
from save_and_load_file import save_player_data


class TestSavePlayerData(TestCase):
    def test_save_player_data_normal_character(self):
        player = Character('Vincent')
        self.assertEqual({'hp': 10,
                          'name': 'Vincent',
                          'prev_x_coord': 2,
                          'prev_y_coord': 2,
                          'x_coord': 2,
                          'y_coord': 2}, save_player_data(player))

    def test_save_player_data_blank_name(self):
        player = Character('')
        self.assertEqual({'hp': 10,
                          'name': '',
                          'prev_x_coord': 2,
                          'prev_y_coord': 2,
                          'x_coord': 2,
                          'y_coord': 2}, save_player_data(player))

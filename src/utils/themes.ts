import { Omit } from 'react-redux';
import { Theme } from 'store/state';

/**
 * These are the default themes!
 * You're free to add more ;)
 */
export default [
  {
    boardBackgroundColor: '#326FC8',
    boardBackgroundShadowColor: '#333',
    boardHolesColor: 'transparent',
    boardHolesOnHoverColor: '#eee',
    boardHolesShadowColor: '#333',
    playerColors: ['red', 'yellow', 'palevioletred', 'green']
  },
  {
    boardBackgroundColor: '#DDFFF7',
    boardBackgroundShadowColor: '#333',
    boardHolesColor: 'transparent',
    boardHolesOnHoverColor: '#eee',
    boardHolesShadowColor: '#333',
    playerColors: ['#FFA69E', '#AA4465', '#80DED9', '#462255']
  },
  {
    boardBackgroundColor: '#3066BE',
    boardBackgroundShadowColor: '#333',
    boardHolesColor: 'transparent',
    boardHolesOnHoverColor: '#eee',
    boardHolesShadowColor: '#333',
    playerColors: ['#119DA4', '#6D9DC5', '#80DED9', '#AEECEF']
  },
  {
    boardBackgroundColor: '#CE2D4F',
    boardBackgroundShadowColor: '#333',
    boardHolesColor: 'transparent',
    boardHolesOnHoverColor: '#eee',
    boardHolesShadowColor: '#333',
    playerColors: ['#4056F4', '#470FF4', '#CEBBC9', '#AEECEF']
  }
] as Omit<Theme, 'id'>[];

import { createTheme } from '@mui/material/styles';

export const CATEGORIES = ['Books', 'Furniture', 'Electronics', 'Clothing', 'Other'];
export const CONDITIONS = ['New', 'Like New', 'Very Good', 'Good', 'Acceptable'];
export const SORTING = ['Best Match', 'Price: Low to High', 'Price: High to Low', 'Post Date: New to Old', 'Post Date: Old to New'];
export const MAXPRICE = 500;

export const pageTheme = createTheme({
    palette: {
      primary: {
        main: '#b2102f',
      },
      secondary: {
        main: '#6f252c',
      },
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            padding: '15px',
            gap: '5px',
            boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',
          },
        },
      },
    },
});

export const SortList = (arr, sort) => {
  switch (sort) {
    case 'Price: Low to High':
      arr.sort((a, b) => a.price - b.price);
      break;
    case 'Price: High to Low':
      arr.sort((a, b) => b.price - a.price);
      break;
    case 'Post Date: New to Old':
      arr.sort((a, b) => new Date(b.postDate) - new Date(a.postDate));
      break;
    case 'Post Date: Old to New':
      arr.sort((a, b) => new Date(a.postDate) - new Date(b.postDate));
      break;
    default:
      // TODO: implement best match (right now it just displays everything in the arrays original order)

      break;
  }
  return arr
}
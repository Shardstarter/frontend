// ----------------------------------------------------------------------

export default function Tabs(theme) {
  return {
    MuiTab: {
      styleOverrides: {
        root: {
          paddingLeft: theme.spacing(1),
          paaddingRight: theme.spacing(1),
          fontWeight: theme.typography.fontWeightMedium,
          borderTopLeftRadius: 4,
          borderTopRightRadius: 4,
          '&.Mui-selected': {
            color: theme.palette.text.primary
          },
          '&:not(:last-child)': {
            marginRight: theme.spacing(1)
          },
          '@media (min-width: 600px)': {
            minWidth: 80
          }
        },
        labelIcon: {
          minHeight: 48,
          flexDirection: 'row',
          '& > *:first-child': {
            marginBottom: 0,
            // marginRight: theme.spacing(1)
          }
        },
        wrapper: {
          flexDirection: 'row',
          whiteSpace: 'nowrap'
        },
        textColorInherit: {
          opacity: 1,
          color: theme.palette.text.secondary
        }
      }
    },
    MuiTabPanel: {
      styleOverrides: {
        root: {
          padding: 0
        }
      }
    },
    MuiTabScrollButton: {
      styleOverrides: {
        root: {
          width: 48,
          borderRadius: '50%'
        }
      }
    }
  };
}

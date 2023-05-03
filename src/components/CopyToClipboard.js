import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import { CopyToClipboard } from 'react-copy-to-clipboard';
// material
import { Tooltip, IconButton } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

// ----------------------------------------------------------------------

CopyClipboard.propTypes = {
  value: PropTypes.string
};

export default function CopyClipboard({ value, ...other }) {
  const { enqueueSnackbar } = useSnackbar();

  const onCopy = () => {
    enqueueSnackbar('Copied', { variant: 'success' });
  };

  return (
    <CopyToClipboard text={value} onCopy={onCopy}>
      <Tooltip title="Copy">
        <IconButton>
          <ContentCopyIcon sx={{ fontSize: 12, color: 'white' }} />
        </IconButton>
      </Tooltip>
    </CopyToClipboard>
  );
}

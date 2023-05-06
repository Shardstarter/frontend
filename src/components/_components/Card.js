import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { Label } from './Label';
import { LinearProgressBar } from './ProgressBar';
import { SecondaryButton, IconButtonGroup } from './Button';
import { facebook, twitter, instagram, reddit } from 'utils/_utils/EntityFieldDefs';

const Card = (props) => {
  return (
    <Box
      width={320}
      height={150}
      sx={{
        ...props.sx,
        backgroundImage: 'url("_img/cards/background.png")',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <Box sx={{ marginLeft: '22px' }}>
        <img src={props.img} alt={props.label} width={80} />
      </Box>
      <Box sx={{ marginLeft: '15px', display: 'flex', justifyContent: 'space-around', flexFlow: 'column' }}>
        <Label text={{ value: props.label, size: 18 }} />
        <Label text={{ value: props.status, size: 30, color: 'gree' }} />
      </Box>
    </Box>
  );
};

export const RoundedCard = (props) => {
  const { img, bgColor, label, width, height, color, size } = props;
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        borderRadius: '22px',
        width: width,
        height: height,
        backgroundColor: bgColor,
        marginTop: '8px',
        justifyContent: 'center'
      }}
    >
      {img && <img src={img} width={11} alt="Green Dot" style={{ marginRight: '10px' }} />}
      <Label text={{ value: label, weight: 100, color, size }} />
    </Box>
  );
};

export const ProjectCard = ({ project }) => {
  const navigate = useNavigate();

  project.percent = Number(project.weiRaised / project.hardCap * 100).toFixed(1);

  return (
    <Box
      sx={{
        maxWidth: '500px',
        width: '100%',
        backgroundColor: '#000000',
        padding: '30px',
        borderRadius: '20px',
        border: '1px solid #7070704C',
        cursor: 'pointer'
      }}
      onClick={() => navigate(`/projects?address=${project.address}`)}
    >
      <Box display="flex" flexDirection="column">
        <Box display="flex" flexDirection="row">
          <img src={project.poster} alt={project.projectName} width={100} />
          <Box sx={{ paddingLeft: '20px' }}>
            <Label text={{ value: project.projectName, size: 30 }} />
            <RoundedCard
              img="_img/projects/greendot.png"
              bgColor="#171717"
              label="Active"
              width={122}
              height={43}
              color="green"
            />
          </Box>
        </Box>
        <Label text={{ value: project.description, color: 'grey', weight: 100 }} sx={{ marginTop: '25px' }} />
        <Box sx={{ marginTop: '30px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Label text={{ value: 'Max Rise', size: 22, color: 'black' }} />
          <Label text={{ value: "SHM " + project.hardCap, size: 22 }} />
        </Box>
        <Box
          sx={{
            marginTop: '20px',
            marginBottom: '30px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
        >
          <Label text={{ value: 'Token Allocation', size: 22, color: 'black' }} />
          <Label text={{ value: "STU " + project.hardCap * project.presaleRate, size: 22 }} />
        </Box>
        {/* Progress Box */}
        <Box
          sx={{
            backgroundImage: "url('_img/cards/bg.png')",
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            borderRadius: '14px',
            margin: '30px, 0px',
            width: '100%',
            padding: '16px 25px'
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Label text={{ value: "Private Round A" }} />
            <Label text={{ value: "2D:12H:14M" }} />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '22px' }}>
            <Label text={{ value: project.hardCap + " SHM", size: 16, color: 'grey' }} />
            <Label text={{ value: `${project.percent}%`, size: 16, color: 'grey' }} />
          </Box>
          <Box>
            <LinearProgressBar value={project.percent} />
          </Box>
        </Box>

        <Box
          sx={{
            marginTop: '40px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            '@media (max-width: 600px)': {
              flexDirection: 'column',
              alignItems: 'center'
            }
          }}
        >
          <SecondaryButton label={project.privacy} sx={{ width: '190px' }} />
          <IconButtonGroup size="40px" elements={[
            {
              img: '_img/icon/chain.png',
              path: project.ipfs?.website
            },
            {
              img: '_img/icon/twitter.png',
              path: project.ipfs?.twitter
            },
            {
              img: '_img/icon/telegram.png',
              path: project.ipfs?.telegram
            },
            {
              img: '_img/icon/reddit.png',
              path: project.ipfs?.discord
            },
          ]} />
        </Box>
      </Box>
    </Box>
  );
};


export default Card;

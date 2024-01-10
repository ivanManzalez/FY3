// import React, {useState} from "react";
// import Grid from '@mui/material/Grid';
// import Slider from "react-slick";

// const Carousel = ({ChildComponent, data}) => {


// //   const [activeIndex, setActiveIndex] = useState(0);
// //   // 
// //   return (
// //     <div className="carousel">
// //       <div className="inner" 
// //            style={{transform:`translate:(-${activeIndex*100})`}}>
// //       {
// //         data &&
// //         data.map((dataElem, keys)=>(
// //           <ChildComponent {...dataElem}/>
// //         ))
// //       }
// //       </div>

// //       <div className="carousel-buttons">
// //         <button>
// //           <span className="material-symbols-outlined">
// //           arrow_back_ios
// //           </span>
// //         </button>
// //         <button>
// //           <span className="material-symbols-outlined">
// //           arrow_forward_ios
// //           </span>
// //         </button>
// //       </div>
// //     </div>

  
//   // return (
//   //   <div className="carousel">
//   //     <div className="carousel-button">
//   //       &lt;
//   //     </div>
//   //     <div className="inner">
//   //       <div className="carousel-item">
//   //         <img src="/static/images/fy3-logo.png" alt=""></img>
//   //       </div>
//   //       <div className="carousel-item">
//   //         <img src="/static/images/fy3-logo.png" alt=""></img>
//   //       </div>
//   //       <div className="carousel-item">
//   //         <img src="/static/images/fy3-logo.png" alt=""></img>
//   //       </div>
//   //       <div className="carousel-item">
//   //         <img src="/static/images/fy3-logo.png" alt=""></img>
//   //       </div>
//   //       <div className="carousel-item">
//   //         <img src="/static/images/fy3-logo.png" alt=""></img>
//   //       </div>
//   //       <div className="carousel-item">
//   //         <img src="/static/images/fy3-logo.png" alt=""></img>
//   //       </div>
//   //       <div className="carousel-item">
//   //         <img src="/static/images/fy3-logo.png" alt=""></img>
//   //       </div>
//   //       <div className="carousel-item">
//   //         <img src="/static/images/fy3-logo.png" alt=""></img>
//   //       </div>
//   //       <div className="carousel-item">
//   //         <img src="/static/images/fy3-logo.png" alt=""></img>
//   //       </div>
//   //       <div className="carousel-item">
//   //         <img src="/static/images/fy3-logo.png" alt=""></img>
//   //       </div>
//   //       <div className="carousel-item">
//   //         <img src="/static/images/fy3-logo.png" alt=""></img>
//   //       </div>
//   //       <div className="carousel-item">
//   //         <img src="/static/images/fy3-logo.png" alt=""></img>
//   //       </div>
//   //       <div className="carousel-item">
//   //         <img src="/static/images/fy3-logo.png" alt=""></img>
//   //       </div>
//   //       <div className="carousel-item">
//   //         <img src="/static/images/fy3-logo.png" alt=""></img>
//   //       </div>
//   //       <div className="carousel-item">
//   //         <img src="/static/images/fy3-logo.png" alt=""></img>
//   //       </div>
//   //       <div className="carousel-item">
//   //         <img src="/static/images/fy3-logo.png" alt=""></img>
//   //       </div>
//   //       <div className="carousel-item">
//   //         <img src="/static/images/fy3-logo.png" alt=""></img>
//   //       </div>
//   //       <div className="carousel-item">
//   //         <img src="/static/images/fy3-logo.png" alt=""></img>
//   //       </div>
//   //       <div className="carousel-item">
//   //         <img src="/static/images/fy3-logo.png" alt=""></img>
//   //       </div>
//   //       <div className="carousel-item">
//   //         <img src="/static/images/fy3-logo.png" alt=""></img>
//   //       </div>
//   //       <div className="carousel-item">
//   //         <img src="/static/images/fy3-logo.png" alt=""></img>
//   //       </div>
//   //       <div className="carousel-item">
//   //         <img src="/static/images/fy3-logo.png" alt=""></img>
//   //       </div>
//   //       <div className="carousel-item">
//   //         <img src="/static/images/fy3-logo.png" alt=""></img>
//   //       </div>
//   //     </div>
//   //     <div className="carousel-button">
//   //       &gt;
//   //     </div>
//   //   </div>

//   // );
// }

// export default Carousel;

import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import Grid from '@mui/material/Grid';
import CardMedia from '@mui/material/CardMedia';


const upcomingGames = [
    {
      homeTeamAbbr:"BLT",
      homeRecord:"5-1",
      awayTeamAbbr:"PTG",
      awayRecord:"7-0",
      date:"Jan 13, 2024",
    },
    {
      homeTeamAbbr:"SZN",
      homeRecord:"5-1",
      awayTeamAbbr:"GTM",
      awayRecord:"7-0",
      date:"Jan 13, 2024",
    },
    {
      homeTeamAbbr:"SGN",
      homeRecord:"5-1",
      awayTeamAbbr:"BBL",
      awayRecord:"7-0",
      date:"Jan 13, 2024"
    },
    {
      homeTeamAbbr:"FSQ",
      homeRecord:"5-1",
      awayTeamAbbr:"STB",
      awayRecord:"7-0",
      date:"Jan 13, 2024"
    },
    {
      homeTeamAbbr:"FSQ",
      homeRecord:"5-1",
      awayTeamAbbr:"BBL",
      awayRecord:"7-0",
      date:"Jan 20, 2024"
    },
    {
      homeTeamAbbr:"SGN",
      homeRecord:"5-1",
      awayTeamAbbr:"BLT",
      awayRecord:"7-0",
      date:"Jan 20, 2024"
    },
    {
      homeTeamAbbr:"GTM",
      homeRecord:"5-1",
      awayTeamAbbr:"PTG",
      awayRecord:"7-0",
      date:"Jan 27, 2024",
    },
    {
      homeTeamAbbr:"SZN",
      homeRecord:"5-1",
      awayTeamAbbr:"BLT",
      awayRecord:"7-0",
      date:"Jan 27, 2024",
    },
    {
      homeTeamAbbr:"BBL",
      homeRecord:"5-1",
      awayTeamAbbr:"FSQ",
      awayRecord:"7-0",
      date:"Feb 1, 2024"
    },

    {
      homeTeamAbbr:"BBL",
      homeRecord:"5-1",
      awayTeamAbbr:"GTM",
      awayRecord:"7-0",
      date:"Feb 1, 2024"
    },
    {
      homeTeamAbbr:"BBL",
      homeRecord:"5-1",
      awayTeamAbbr:"GTM",
      awayRecord:"7-0",
      date:"Feb 1, 2024"
    },
    {
      homeTeamAbbr:"BBL",
      homeRecord:"5-1",
      awayTeamAbbr:"GTM",
      awayRecord:"7-0",
      date:"Feb 1, 2024"
    },
    {
      homeTeamAbbr:"BBL",
      homeRecord:"5-1",
      awayTeamAbbr:"GTM",
      awayRecord:"7-0",
      date:"Feb 1, 2024"
    },
  ]
const data = [
  {
    src: 'https://images.unsplash.com/photo-1502657877623-f66bf489d236',
    title: 'Night view',
    description: '4.21M views',
  },
  {
    src: 'https://images.unsplash.com/photo-1527549993586-dff825b37782',
    title: 'Lake view',
    description: '4.74M views',
  },
  {
    src: 'https://images.unsplash.com/photo-1532614338840-ab30cf10ed36',
    title: 'Mountain view',
    description: '3.98M views',
  },
  {
    src: 'https://images.unsplash.com/photo-1532614338840-ab30cf10ed36',
    title: 'Mountain view',
    description: '3.98M views',
  },
  {
    src: 'https://images.unsplash.com/photo-1502657877623-f66bf489d236',
    title: 'Night view',
    description: '4.21M views',
  },
  {
    src: 'https://images.unsplash.com/photo-1527549993586-dff825b37782',
    title: 'Lake view',
    description: '4.74M views',
  },
  {
    src: 'https://images.unsplash.com/photo-1532614338840-ab30cf10ed36',
    title: 'Mountain view',
    description: '3.98M views',
  },
  {
    src: 'https://images.unsplash.com/photo-1532614338840-ab30cf10ed36',
    title: 'Mountain view',
    description: '3.98M views',
  },
  {
    src: 'https://images.unsplash.com/photo-1502657877623-f66bf489d236',
    title: 'Night view',
    description: '4.21M views',
  },
  {
    src: 'https://images.unsplash.com/photo-1527549993586-dff825b37782',
    title: 'Lake view',
    description: '4.74M views',
  },
  {
    src: 'https://images.unsplash.com/photo-1532614338840-ab30cf10ed36',
    title: 'Mountain view',
    description: '3.98M views',
  },
  {
    src: 'https://images.unsplash.com/photo-1532614338840-ab30cf10ed36',
    title: 'Mountain view',
    description: '3.98M views',
  },
  {
    src: 'https://images.unsplash.com/photo-1502657877623-f66bf489d236',
    title: 'Night view',
    description: '4.21M views',
  },
  {
    src: 'https://images.unsplash.com/photo-1527549993586-dff825b37782',
    title: 'Lake view',
    description: '4.74M views',
  },
  {
    src: 'https://images.unsplash.com/photo-1532614338840-ab30cf10ed36',
    title: 'Mountain view',
    description: '3.98M views',
  },
  {
    src: 'https://images.unsplash.com/photo-1532614338840-ab30cf10ed36',
    title: 'Mountain view',
    description: '3.98M views',
  },
  {
    src: 'https://images.unsplash.com/photo-1502657877623-f66bf489d236',
    title: 'Night view',
    description: '4.21M views',
  },
  {
    src: 'https://images.unsplash.com/photo-1527549993586-dff825b37782',
    title: 'Lake view',
    description: '4.74M views',
  },
  {
    src: 'https://images.unsplash.com/photo-1532614338840-ab30cf10ed36',
    title: 'Mountain view',
    description: '3.98M views',
  },
  {
    src: 'https://images.unsplash.com/photo-1532614338840-ab30cf10ed36',
    title: 'Mountain view',
    description: '3.98M views',
  },
];
const GameCard = (props) => {
  const fy3Logo = "/static/images/fy3-logo.png";
  return(
    <Card style={{ minWidth: '200px' }} className={"carousel-item"}>
      
      <Grid container direction="row" justifyContent="space-around" spacing={0}>
        <Grid container item direction="column" xs={5} sx={{backgroundColor:""}}>
          <CardMedia
            component="img"
            width="70"
            height="70"
            image={fy3Logo}
            alt="team logo"
            margin="right"
          />
          <Typography variant="subtitle1" component="div"> {props.homeTeamAbbr} </Typography>
          <Typography variant="subtitle1" component="div"> {props.homeRecord} </Typography>
        </Grid>
        <Grid item xs={2} sx={{backgroundColor:"", display:"flex",justifyContent:"center", alignItems:"center"}}>
          <Typography variant="body1" >vs</Typography>
        </Grid>
        <Grid container item direction="column" xs={5} sx={{backgroundColor:""}}>
          <CardMedia
            component="img"
            width="70"
            height="70"
            image={fy3Logo}
            alt="team logo"
            margin="right"
          />
          <Typography variant="subtitle1" component="div"> {props.awayTeamAbbr} </Typography>
          <Typography variant="subtitle1" component="div"> {props.awayRecord} </Typography>
        </Grid>

      </Grid>
      
      <Typography variant="caption" component="div"> {props.date} </Typography>
      <Typography variant="caption" component="div"> Terry Miller </Typography>
    
    </Card>
  )}

export default function Carousel () {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 1,
        py: 1,
        overflow: 'auto',
        maxWidth:"90%",
        width: 1000,
        scrollSnapType: 'x mandatory',
        '& > *': {
          scrollSnapAlign: 'start',
        },
        '::-webkit-scrollbar': { display: 'none' },
      }}
    >
      {
        upcomingGames &&
        upcomingGames.map((game, key)=>(
          <GameCard 
          homeRecord={game.homeRecord} 
          awayRecord={game.awayRecord}
          homeTeamAbbr={game.homeTeamAbbr} 
          awayTeamAbbr={game.awayTeamAbbr}
          date={game.date} />
        ))
      }
    </Box>
  );
}


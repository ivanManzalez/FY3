import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import Grid from '@mui/material/Grid';
import CardMedia from '@mui/material/CardMedia';
import { useMediaQuery, useTheme} from "@mui/material";
import ScreenSizeWatcher from "./ScreenSizeWatcher"


const games = [
  {
    homeTeamAbbr:"BLT",
    homeRecord:"5-1",
    awayTeamAbbr:"PTG",
    awayRecord:"7-0",
    date:"Jan 13, 2024",
    display:true,
  },
  {
    homeTeamAbbr:"SZN",
    homeRecord:"5-1",
    awayTeamAbbr:"GTM",
    awayRecord:"7-0",
    date:"Jan 13, 2024",
    display:true,  
  },
  {
    homeTeamAbbr:"SGN",
    homeRecord:"5-1",
    awayTeamAbbr:"BBL",
    awayRecord:"7-0",
    date:"Jan 13, 2024",
    display:true,  
  },
  {
    homeTeamAbbr:"FSQ",
    homeRecord:"5-1",
    awayTeamAbbr:"STB",
    awayRecord:"7-0",
    date:"Jan 13, 2024",
    display:true,  
  },
  {
    homeTeamAbbr:"FSQ",
    homeRecord:"5-1",
    awayTeamAbbr:"BBL",
    awayRecord:"7-0",
    date:"Jan 20, 2024",
    display:true,
  },
  {
    homeTeamAbbr:"SGN",
    homeRecord:"5-1",
    awayTeamAbbr:"BLT",
    awayRecord:"7-0",
    date:"Jan 20, 2024",
    display:true,
  },
  {
    homeTeamAbbr:"GTM",
    homeRecord:"5-1",
    awayTeamAbbr:"PTG",
    awayRecord:"7-0",
    date:"Jan 27, 2024",
    display:true,
  },
  {
    homeTeamAbbr:"SZN",
    homeRecord:"5-1",
    awayTeamAbbr:"BLT",
    awayRecord:"7-0",
    date:"Jan 27, 2024",
    display:true,
  },
  {
    homeTeamAbbr:"BBL",
    homeRecord:"5-1",
    awayTeamAbbr:"FSQ",
    awayRecord:"7-0",
    date:"Feb 1, 2024",
    display:true,  
  },

  {
    homeTeamAbbr:"BBL",
    homeRecord:"5-1",
    awayTeamAbbr:"GTM",
    awayRecord:"7-0",
    date:"Feb 1, 2024",
    display:true,  
  },
  {
    homeTeamAbbr:"BBL",
    homeRecord:"5-1",
    awayTeamAbbr:"GTM",
    awayRecord:"7-0",
    date:"Feb 1, 2024",
    display:true,  
  },
  {
    homeTeamAbbr:"BBL",
    homeRecord:"5-1",
    awayTeamAbbr:"GTM",
    awayRecord:"7-0",
    date:"Feb 1, 2024",
    display:true,  
  },
  {
    homeTeamAbbr:"BBL",
    homeRecord:"5-1",
    awayTeamAbbr:"GTM",
    awayRecord:"7-0",
    date:"Feb 1, 2024",
    display:true,  
  },
  {
    homeTeamAbbr:"BBL",
    homeRecord:"5-1",
    awayTeamAbbr:"GTM",
    awayRecord:"7-0",
    date:"Feb 1, 2024",
    display:true,  
  },
  {
    homeTeamAbbr:"BBL",
    homeRecord:"5-1",
    awayTeamAbbr:"GTM",
    awayRecord:"7-0",
    date:"Feb 1, 2024",
    display:true,  
  },
  {
    homeTeamAbbr:"BBL",
    homeRecord:"5-1",
    awayTeamAbbr:"GTM",
    awayRecord:"7-0",
    date:"Feb 1, 2024",
    display:true,  
  },
  {
    homeTeamAbbr:"BBL",
    homeRecord:"5-1",
    awayTeamAbbr:"GTM",
    awayRecord:"7-0",
    date:"Feb 1, 2024",
    display:true,  
  },
  {
    homeTeamAbbr:"BBL",
    homeRecord:"5-1",
    awayTeamAbbr:"GTM",
    awayRecord:"7-0",
    date:"Feb 1, 2024",
    display:true,  
  },
  {
    homeTeamAbbr:"BBL",
    homeRecord:"5-1",
    awayTeamAbbr:"GTM",
    awayRecord:"7-0",
    date:"Feb 1, 2024",
    display:true,  
  },
  {
    homeTeamAbbr:"BBL",
    homeRecord:"5-1",
    awayTeamAbbr:"GTM",
    awayRecord:"7-0",
    date:"Feb 1, 2024",
    display:true,  
  },
]

const GameCard = (props) => {
  const fy3Logo = "/static/images/fy3-logo.png";
  const textStyle = {
    color:"white"
  }
  const display = (props.display) ?"": "none";


  return(
    <Card style={{ minWidth: '150px', backgroundColor:"transparent", border: "2px solid #0E0330", display:display}} className={"carousel-item"} >
      
      <Grid container direction="row" justifyContent="space-around" spacing={0}>
        <Grid container item direction="column" xs={5} sx={{backgroundColor:""}} justifyContent="space-between" alignItems="center">
          <CardMedia
            component="img"
            width="70"
            height="70"
            image={fy3Logo}
            alt="team logo"
            margin="right"
          />
          <Typography variant="subtitle1" component="div" style={textStyle}> {props.homeTeamAbbr} </Typography>
          <Typography variant="subtitle1" component="div" style={textStyle}> {props.homeRecord} </Typography>
        </Grid>
        <Grid item xs={2} sx={{backgroundColor:"", display:"flex",justifyContent:"center", alignItems:"center"}}>
          <Typography variant="body1" color="#0E0330" style={{}}>vs</Typography>
        </Grid>
        <Grid container item direction="column" xs={5} sx={{backgroundColor:""}} justifyContent="space-between" alignItems="center">
          <CardMedia
            component="img"
            width="70"
            height="70"
            image={fy3Logo}
            alt="team logo"
            margin="right"
          />
          <Typography variant="subtitle1" component="div" style={textStyle}> {props.awayTeamAbbr} </Typography>
          <Typography variant="subtitle1" component="div" style={textStyle}> {props.awayRecord} </Typography>
        </Grid>

      </Grid>
      {(props.screenSize.isXlarge || props.screenSize.isLarge) &&
      <>
      <Typography variant="caption" component="div" style={textStyle}> {props.date} </Typography>
      <Typography variant="caption" component="div" style={textStyle}> Terry Miller </Typography>
      </>
      }
    </Card>
  )}

export default function Carousel () {
  const containerRef = React.useRef(null);
  const screenSize = ScreenSizeWatcher();
  const gameCardWidth = 150;
  

  const updateGameDisplay = (start, end) => {
    console.log(start, end )
    setDisplayRange({ start, end });
  };

  const handleResize = () => {
    if (containerRef.current) {
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      return {width:width};
    }
    return { width: 0};
  };
  const [containerWindow, setContainerWindow] = React.useState(3);

  React.useEffect(() => {
    const containerDim = handleResize(); // Initial call to get dimensions on mount
    setContainerWindow(Math.floor(containerDim.width/gameCardWidth))

    const resizeHandler = () => {
      const newWidth = handleResize();
      const windowWidth = screenSize.width;
      if (windowWidth > 2*newWidth.width){
        console.log(`${windowWidth} > ${2*newWidth.width}`, windowWidth > 2*newWidth.width)
        setContainerWindow(Math.ceil(windowWidth / gameCardWidth)-1);
        updateGameDisplay(0, Math.ceil(windowWidth / gameCardWidth)-1)
      }else{
        console.log(`${windowWidth} > ${2*newWidth.width}`,  windowWidth > 2*newWidth.width)
        setContainerWindow(Math.ceil(newWidth.width / gameCardWidth/2));
        updateGameDisplay(0, Math.ceil(newWidth.width / gameCardWidth/2))
      }  
    };

    window.addEventListener('resize', resizeHandler);

    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, [screenSize.width]);

  const [upcomingGames, setUpcomingGames] = React.useState(games); // Initialize with your data
  const [displayRange , setDisplayRange ] = React.useState({ start: 0, end: containerWindow });
  

  const handlePrevClick = () =>{
    const newStart = displayRange.start - 1;
    const newEnd = displayRange.end - 1;

    if (newStart >= 0) {
      updateGameDisplay(newStart, newEnd);
    }
  }
  const handleNextClick = () =>{
    const newStart = displayRange.start + 1;
    const newEnd = displayRange.end + 1;

    if (newEnd <= upcomingGames.length) {
      updateGameDisplay(newStart, newEnd);
    }
  }

  return (
    <Box
      ref={containerRef}
      sx={{
        display: 'flex',
        gap: 1,
        py: 1,
        overflow: 'auto',
        // maxWidth:500,
        minWidth: "100%",
        maxWidth: "100%",
        border: "2px solid #0E0330",
        background: 'linear-gradient(180deg, #260880 10%, #000 80%)', // Example gradient from red to blue
        borderRadius:10,
        paddingLeft:"8px",
        // scrollSnapType: 'x mandatory',
        '& > *': {
          scrollSnapAlign: 'end',
        },
        '::-webkit-scrollbar': { display: 'none' },
      }}
    >
    {(displayRange.start > 0) && <div style={{position:"sticky",height:"100%",width:"10px", left:0, backgroundColor:"blue", cursor: "pointer"}} onClick={handlePrevClick}>&lt;</div>}
      {
        upcomingGames &&
        upcomingGames.slice(displayRange.start, displayRange.end).map((game, index)=>(
          <GameCard 
          key={index}
          homeRecord={game.homeRecord} 
          awayRecord={game.awayRecord}
          homeTeamAbbr={game.homeTeamAbbr} 
          awayTeamAbbr={game.awayTeamAbbr}
          date={game.date} 
          display={game.display}
          screenSize={screenSize}
          />
          
        ))
      }
    {(displayRange.end <= (upcomingGames.length)) && <div style={{position:"sticky", height:"100%",width:"50px",right:0, backgroundColor:"blue", cursor: "pointer"}} onClick={handleNextClick}>&gt;</div>}
    </Box>
  );
}


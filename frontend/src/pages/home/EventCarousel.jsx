// import React from 'react';
// import Card from '@mui/material/Card';
// import Typography from '@mui/material/Typography';


// const EventCarousel = () => {
//   const carouselContainer = {
//     width:"100%",
//     border:"2px solid #260880",
//     background:"radial-gradient(circle at 100% 125%, #260880, #000)",
//     borderRadius:10,
//   };
//   const eventsWheelContainer = {
//     display: "flex",
//     flexDirection: "row",
//     gap:2,
//     maxWidth: "100%",
//     minWidth: "100%",
//     minHeight: "70%",
//     backgroundColor: "white",
//     overflowX: 'hidden',
//     scrollSnapType: 'x mandatory',
//     '& > *': {
//       scrollSnapAlign: 'center',
//     },
//     // '::-webkit-scrollbar': { display: 'none' }, //find in ./index.css
//   };

//   const cardStyles = {
//     minWidth:"150px",
//     minHeight:"150px",
//     backgroundColor:"blue",
//     borderRadius:10,
//   }
//   const moveWheelButton = {
//     position:"sticky",
//     backgroundColor:"red",
//     "::hover":"green",
//   }
//   const rightButton = {
//     right: '1px', // Set right button position
//   };
//   const leftButton = {
//     left: '1px', // Set right button position
//   };

//   return(
//     <>
//     <div style={carouselContainer}>
//       <Typography color="#260880">Coming up ...</Typography>
//       <div className="eventsWheelContainer" style={eventsWheelContainer}>
//         <button style={{ ...moveWheelButton, ...leftButton }}></button>
//         <div style={cardStyles}>Event 01</div>
//         <div style={cardStyles}>Event 02</div>
//         <div style={cardStyles}>Event 03</div>
//         <div style={cardStyles}>Event 04</div>
//         <div style={cardStyles}>Event 05</div>
//         <div style={cardStyles}>Event 06</div>
//         <div style={cardStyles}>Event 07</div>
//         <div style={cardStyles}>Event 08</div>
//         <div style={cardStyles}>Event 09</div>
//         <div style={cardStyles}>Event 10</div>
//         <div style={cardStyles}>Event 11</div>
//         <div style={cardStyles}>Event 12</div>
//         <div style={cardStyles}>Event 13</div>
//         <div style={cardStyles}>Event 14</div>
//         <div style={cardStyles}>Event 15</div>
//         <div style={cardStyles}>Event 16</div>
//         <div style={cardStyles}>Event 17</div>
//         <div style={cardStyles}>Event 18</div>
//         <div style={cardStyles}>Event 19</div>
//         <div style={cardStyles}>Event 20</div>
//         <button style={{ ...moveWheelButton, ...rightButton }}></button>
//       </div>
      
//     </div>
//     </>
//     )
// };

// export default EventCarousel;


import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';

const data = [
  {
    src: 'https://images.unsplash.com/photo-1532614338840-ab30cf10ed36',
    title: 'Mountain view',
    show:true,
    description: '3.98M views',
  },
  {
    src: 'https://images.unsplash.com/photo-1502657877623-f66bf489d236',
    title: 'Night view',
    show:true,
    description: '4.21M views',
  },
  {
    src: 'https://images.unsplash.com/photo-1527549993586-dff825b37782',
    title: 'Lake view',
    show:true,
    description: '4.74M views',
  },
  {
    src: 'https://images.unsplash.com/photo-1532614338840-ab30cf10ed36',
    title: 'Mountain view',
    show:true,
    description: '3.98M views',
  },
  {
    src: 'https://images.unsplash.com/photo-1502657877623-f66bf489d236',
    title: 'Night view',
    show:true,
    description: '4.21M views',
  },
  {
    src: 'https://images.unsplash.com/photo-1532614338840-ab30cf10ed36',
    title: 'Mountain view',
    show:true,
    description: '3.98M views',
  },
  {
    src: 'https://images.unsplash.com/photo-1502657877623-f66bf489d236',
    title: 'Night view',
    show:true,
    description: '4.21M views',
  },
  {
    src: 'https://images.unsplash.com/photo-1532614338840-ab30cf10ed36',
    title: 'Mountain view',
    show:true,
    description: '3.98M views',
  },
  {
    src: 'https://images.unsplash.com/photo-1502657877623-f66bf489d236',
    title: 'Night view',
    description: '4.21M views',
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
    src: 'https://images.unsplash.com/photo-1532614338840-ab30cf10ed36',
    title: 'Mountain view',
    description: '3.98M views',
  },
];

export default function EventCarousel() {
  return (
    <Box
      sx={{
        backgroundColor:"red",
        display: 'flex',
        gap: 1,
        py: 1,
        overflow: 'auto',
        left:"1%",
        right:"1%",
        width: "98%",
        scrollSnapType: 'x mandatory',
        '& > *': {
          scrollSnapAlign: 'center',
        },
        '::-webkit-scrollbar': { display: 'none' },
      }}
    >
      {data.map((item) => (
        <div style={
          {
            display:"flex",
            flexDirection:"row",
            backgroundColor:"white",
            display:(item.show)?"":'none'
          }
        }>
        <div orientation="vertical" size="sm" key={item.title} variant="outlined">
          <AspectRatio ratio="1" sx={{ width: 60 }}>
            <img
              srcSet={`${item.src}?h=120&fit=crop&auto=format&dpr=2 2x`}
              src={`${item.src}?h=120&fit=crop&auto=format`}
              alt={item.title}
            />
          </AspectRatio>
          <Box sx={{ whiteSpace: 'nowrap', mx: 1 }}>
            <Typography level="title-md">{item.title}</Typography>
            <Typography level="body-sm">{item.description}</Typography>
            <Typography level="body-sm">{item.description}</Typography>
          </Box>
        </div>
        <div orientation="vertical" size="sm" key={item.title} variant="outlined">
          <AspectRatio ratio="1" sx={{ width: 60 }}>
            <img
              srcSet={`${item.src}?h=120&fit=crop&auto=format&dpr=2 2x`}
              src={`${item.src}?h=120&fit=crop&auto=format`}
              alt={item.title}
            />
          </AspectRatio>
          <Box sx={{ whiteSpace: 'nowrap', mx: 1 }}>
            <Typography level="title-md">{item.title}</Typography>
            <Typography level="body-sm">{item.description}</Typography>
            <Typography level="body-sm">{item.description}</Typography>
          </Box>
        </div>
        </div >
      ))}
    </Box>
  );
}
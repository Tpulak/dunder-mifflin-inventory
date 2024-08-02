// 'use client'
// import Image from 'next/image'
// import { useState, useEffect } from 'react';
// import { firestore } from '@/firebase';
// import { Box, Button, Typography, Modal, Stack, TextField } from '@mui/material';
// import { collection, deleteDoc, doc, getDoc, getDocs, query, setDoc } from 'firebase/firestore';

// export default function Home() {
//   const [inventory, setInventory] = useState([]);
//   const [open, setOpen] = useState(false);
//   const [itemName, setItemName] = useState('');
//   const [searchQuery, setSearchQuery] = useState(''); // State for search query

//   const updateInventory = async () => {
//     const snapshot = query(collection(firestore, 'inventory'));
//     const docs = await getDocs(snapshot);
//     const inventoryList = [];
//     docs.forEach((doc) => {
//       inventoryList.push({
//         name: doc.id,
//         ...doc.data(),
//       });
//     });
//     setInventory(inventoryList);
//   };

//   const addItem = async (item) => {
//     const docRef = doc(collection(firestore, 'inventory'), item);
//     const docSnap = await getDoc(docRef);

//     if (docSnap.exists()) {
//       const { quantity } = docSnap.data();
//       await setDoc(docRef, { quantity: quantity + 1 });
//     } else {
//       await setDoc(docRef, { quantity: 1 });
//     }
//     await updateInventory();
//   };

//   const removeItem = async (item) => {
//     const docRef = doc(collection(firestore, 'inventory'), item);
//     const docSnap = await getDoc(docRef);

//     if (docSnap.exists()) {
//       const { quantity } = docSnap.data();
//       if (quantity === 1) {
//         await deleteDoc(docRef);
//       } else {
//         await setDoc(docRef, { quantity: quantity - 1 });
//       }
//     }
//     await updateInventory();
//   };

//   useEffect(() => {
//     updateInventory();
//   }, []);

//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   const filteredInventory = inventory.filter(item => // Filtering inventory based on search query
//     item.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <Box width="100vw" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap={2} bgcolor="#295d99" padding={4}>
//       {/* Company logo */}
//       <Box width="100%" height="auto" mb={2} textAlign="center" >
//         <Typography variant="h1" color="#fff">
//             Dunder Mifflin 
//           </Typography>
//           <Typography variant="h3" color="#fff">
//             Paper Company Inc.
//           </Typography>
//       </Box>
      
//       <Modal open={open} onClose={handleClose}>
//         <Box position="absolute" top="50%" left="50%" width={400} bgcolor="white" border="2px solid #000" boxShadow={24} p={4} display="flex" flexDirection="column" gap={3} sx={{ transform: 'translate(-50%,-50%)' }}>
//           <Typography variant="h6" color="#295d99">Add Inventory Item</Typography>
//           <Stack width="100%" direction="row" spacing={2}>
//             <TextField
//               variant="outlined"
//               fullWidth
//               value={itemName}
//               onChange={(e) => setItemName(e.target.value)}
//             />
//             <Button
//               variant="outlined"
//               color="primary"
//               onClick={() => {
//                 addItem(itemName);
//                 setItemName('');
//                 handleClose();
//               }}
//             >
//               Add
//             </Button>
//           </Stack>
//         </Box>
//       </Modal>
//       <Button
//         variant="contained"
//         color="primary"
//         onClick={handleOpen}
//         sx={{ backgroundColor: '#295d99' }}
//       >
//         Add New Item
//       </Button>
//       <Box border="2px solid #333" borderRadius="8px" bgcolor="white" boxShadow={3} p={2}>
//         <Box width="800px" height="100px" bgcolor="#295d99" display="flex" alignItems="center" justifyContent="center" borderRadius="8px 8px 0 0">
//           <Typography variant="h2" color="#fff">
//             Inventory
//           </Typography>
//         </Box>
//         <TextField
//           variant="outlined"
//           fullWidth
//           placeholder="Search items"
//           value={searchQuery} // Search input value
//           onChange={(e) => setSearchQuery(e.target.value)} // Search input change handler
//           sx={{ margin: 2, maxWidth: '800px' }} // Set maximum width to avoid overflow
//         />
//         <Stack width="800px" height="300px" spacing={2} overflow="auto" sx={{ backgroundColor: '#f9f9f9', borderRadius: '0 0 8px 8px', padding: 2 }}>
//           {filteredInventory.map(({ name, quantity }) => (
//             <Box key={name} width="100%" minHeight="150px" display="flex" alignItems="center" justifyContent="space-between" bgcolor="#fff" border="1px solid #ddd" borderRadius="8px" padding={3} boxShadow={1}>
//               <Typography variant="h4" color="#333" textAlign="center">
//                 {name.charAt(0).toUpperCase() + name.slice(1)}
//               </Typography>
//               <Typography variant="h4" color="#333" textAlign="center">
//                 {quantity}
//               </Typography>
//               <Stack direction="row" spacing={2}>
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   onClick={() => addItem(name)}
//                   sx={{ backgroundColor: '#295d99' }}
//                 >
//                   Add
//                 </Button>
//                 <Button
//                   variant="contained"
//                   color="error"
//                   onClick={() => removeItem(name)}
//                 >
//                   Remove
//                 </Button>
//               </Stack>
//             </Box>
//           ))}
//         </Stack>
//       </Box>
//     </Box>
//   );
// }


'use client'
import Image from 'next/image'
import { useState, useEffect } from 'react';
import { firestore } from '@/firebase';
import { Box, Button, Typography, Modal, Stack, TextField } from '@mui/material';
import { collection, deleteDoc, doc, getDoc, getDocs, query, setDoc } from 'firebase/firestore';

export default function Home() {
  const [inventory, setInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState('');
  const [searchQuery, setSearchQuery] = useState(''); // State for search query

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, 'inventory'));
    const docs = await getDocs(snapshot);
    const inventoryList = [];
    docs.forEach((doc) => {
      inventoryList.push({
        name: doc.id,
        ...doc.data(),
      });
    });
    setInventory(inventoryList);
  };

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      await setDoc(docRef, { quantity: quantity + 1 });
    } else {
      await setDoc(docRef, { quantity: 1 });
    }
    await updateInventory();
  };

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      if (quantity === 1) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, { quantity: quantity - 1 });
      }
    }
    await updateInventory();
  };

  useEffect(() => {
    updateInventory();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const filteredInventory = inventory.filter(item => // Filtering inventory based on search query
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box width="100vw" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap={2} bgcolor="#295d99" padding={4}>
      {/* Company logo */}
      <Box width="100%" height="auto" mb={2} textAlign="center" >
        <Typography variant="h1" color="#fff">
          Dunder Mifflin 
        </Typography>
        <Typography variant="h3" color="#fff">
          Paper Company Inc.
        </Typography>
      </Box>
      
      <Modal open={open} onClose={handleClose}>
        <Box position="absolute" top="50%" left="50%" width={400} bgcolor="white" border="2px solid #000" boxShadow={24} p={4} display="flex" flexDirection="column" gap={3} sx={{ transform: 'translate(-50%,-50%)' }}>
          <Typography variant="h6" color="#295d99">Add Inventory Item</Typography>
          <Stack width="100%" direction="row" spacing={2}>
            <TextField
              variant="outlined"
              fullWidth
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
            <Button
              variant="outlined"
              color="primary"
              onClick={() => {
                addItem(itemName);
                setItemName('');
                handleClose();
              }}
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>

      <Box border="2px solid #333" borderRadius="8px" bgcolor="white" boxShadow={3} p={2}>
        <Box display="flex" justifyContent="space-between" alignItems="center" bgcolor="#295d99" borderRadius="8px 8px 0 0" p={2}>
          <Typography variant="h2" color="#fff">
            Inventory
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpen}
            sx={{ backgroundColor: '#306cb2' }}
          >
            Add New Item
          </Button>
        </Box>
        <TextField
          variant="outlined"
          fullWidth
          placeholder="Search items"
          value={searchQuery} // Search input value
          onChange={(e) => setSearchQuery(e.target.value)} // Search input change handler
          sx={{ margin: 2, maxWidth: '760px' }} // Set maximum width to avoid overflow
        />
        <Stack width="800px" height="300px" spacing={2} overflow="auto" sx={{ backgroundColor: '#f9f9f9', borderRadius: '0 0 8px 8px', padding: 2 }}>
          {filteredInventory.map(({ name, quantity }) => (
            <Box key={name} width="100%" minHeight="150px" display="flex" alignItems="center" justifyContent="space-between" bgcolor="#fff" border="1px solid #ddd" borderRadius="8px" padding={3} boxShadow={1}>
              <Typography variant="h4" color="#333" textAlign="center">
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </Typography>
              <Typography variant="h4" color="#333" textAlign="center">
                {quantity}
              </Typography>
              <Stack direction="row" spacing={2}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => addItem(name)}
                  sx={{ backgroundColor: '#295d99' }}
                >
                  Add
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => removeItem(name)}
                >
                  Remove
                </Button>
              </Stack>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}

import { Helmet } from 'react-helmet-async';
// @mui
import { Grid, Button, Container, Stack, Typography } from '@mui/material';
// components
import ReceiptBar from '../components/receipt/receiptBar';
import Iconify from '../components/iconify';
import { BlogPostCard, BlogPostsSort, BlogPostsSearch } from '../sections/@dashboard/blog';
// mock
import RECEIPTS from '../_mock/receipts';

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'date', label: 'Date' },
  { value: 'amount', label: 'Amount' }
];

// ----------------------------------------------------------------------


export default function ReceiptsList() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Blog | Minimal UI </title>
      </Helmet>



      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Receipt List
          </Typography>
          
          <BlogPostsSort options={SORT_OPTIONS} />

        </Stack>
        <Stack mb={5} spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap flexWrap="wrap">
        { RECEIPTS.map( (e,i)  => {
      return (<ReceiptBar amo={e} key={i}/>)
        
        })
        }
        </Stack>

      </Container>


    </>
  );
}
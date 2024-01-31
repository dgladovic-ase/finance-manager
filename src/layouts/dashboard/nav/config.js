// component
import { Home, FormatListBulleted, Add, History, AccountCircle, Receipt } from '@mui/icons-material';
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  // {
  //   title: 'user',
  //   path: '/dashboard/user',
  //   icon: icon('ic_user'),
  // },
  {
    title: 'Scan a receipt',
    path: '/dashboard/scan',
    icon: icon('ic_scan'),
  },
  {
    title: 'Saved Receipts',
    path: '/dashboard/receipts',
    icon: icon('ic_scan'),
  },
  {
    title: 'Transaction History',
    path: '/dashboard/transactions',
    icon: <FormatListBulleted/>,
  },
  // {
  //   title: 'blog',
  //   path: '/dashboard/blog',
  //   icon: icon('ic_blog'),
  // },
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: icon('ic_lock'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];


// <BottomNavigationAction label="Home" icon={<Home />} onClick={() => navigate('/dashboard')} />
// <BottomNavigationAction label="Receipts" icon={<Receipt />} onClick={() => navigate('/dashboard/receipts')} />
// <BottomNavigationAction label="Add" icon={<Add fontSize="large" />} onClick={() => navigate('/dashboard/scan')} />
// <BottomNavigationAction label="Transactions" icon={<FormatListBulleted onClick={() => navigate('/dashboard/transactions')}/>} />
// <BottomNavigationAction label="Account" icon={<AccountCircle />} />


export default navConfig;

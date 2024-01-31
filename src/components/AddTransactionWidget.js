import React from 'react';
import PropTypes from 'prop-types';
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
import AppWidgetSummary from '../sections/@dashboard/app/AppWidgetSummary';

// components
import Iconify from './iconify';

export default function AddTransactionWidget({ total, sx, ...other }) {

  const StyledIcon = styled('div')(({ theme }) => ({
    margin: 'auto',
    display: 'flex',
    borderRadius: '50%',
    alignItems: 'center',
    width: theme.spacing(8),
    height: theme.spacing(8),
    justifyContent: 'center',
    marginBottom: theme.spacing(3),
  }));

  const icon = "bi:arrow-left-right";
  const color = "success";
  const title = "Add Transaction"

  return (
    <Card
      sx={{
        py: 5,
        boxShadow: 0,
        textAlign: 'center',
        bgcolor: 'white',
        border:'solid 2px green',
        // color: (theme) => theme.palette[color].darker,
        // bgcolor: (theme) => theme.palette[color].lighter,
        ...sx,
      }}
      {...other}
    >
      {/* <StyledIcon
        sx={{
          color: (theme) => theme.palette[color].dark,
          backgroundImage: (theme) =>
            `linear-gradient(135deg, ${alpha(theme.palette[color].dark, 0)} 0%, ${alpha(
              theme.palette[color].dark,
              0.24
            )} 100%)`,
        }}
      >
        <Iconify icon={icon} width={24} height={24} />
      </StyledIcon> */}

      {/* <Typography variant="h3">{fShortenNumber(total)}</Typography> */}

      <Typography variant="h4" sx={{ opacity: 0.72 }}>
        {title}
      </Typography>
    </Card>
  );
}

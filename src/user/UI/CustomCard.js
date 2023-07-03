import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

function CustomCard({ medicine }) {
    return (
        <Card className="pb-5" style={{ height: '100%', position: 'relative' }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {medicine.mediname}
                </Typography>
                <Typography sx={{ my: 1.5 }} variant="body2">
                    {medicine.medidesc}
                </Typography>
                <Typography color="text.secondary">
                    <b color="text.primary">Price:</b> <CurrencyRupeeIcon fontSize="16px" />
                    {medicine.mediprice} / pill
                </Typography>
                <Typography color="text.secondary">
                    <b color="text.primary">Ex. Date:</b> {medicine.mediexpiry}
                </Typography>
            </CardContent>
            <CardActions className="more_about_medi">
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    );
}

export default CustomCard;
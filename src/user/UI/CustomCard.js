import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '../UI/button/Button';
import Typography from '@mui/material/Typography';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

function CustomCard({ cardData, btnText, onclick }) {
    return (
        <Card className="p-4 position-relative shadow" style={{ height: '100%', position: 'relative' }}>
            <CardContent className='p-0'>
                <Typography variant="h5" sx={{
                    fontWeight: '700',
                    fontSize: '20px',
                    color: '#2c4964'
                }} component="div">
                    {cardData.mediname}
                </Typography>
                <Typography sx={{ my: 1.5 }} variant="body2">
                    {cardData.medidesc}
                </Typography>
                <Typography color="text.secondary">
                    <b color="text.primary">Price:</b> <CurrencyRupeeIcon fontSize="16px" />
                    {cardData.mediprice} / pill
                </Typography>
                <Typography color="text.secondary">
                    <b color="text.primary">Ex. Date:</b> {cardData.mediexpiry}
                </Typography>

                <CardActions className="more_about_medi py-5">
                    {
                        btnText ?
                            <Button size="small" classes='rounded px-3' onClick={() => onclick(cardData.id)}>{btnText}</Button>
                            : null
                    }
                </CardActions>
            </CardContent>
        </Card>
    );
}

export default CustomCard;
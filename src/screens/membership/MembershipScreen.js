import React, {useCallback, useEffect, useState} from "react";
import axios from "axios";
import {useSelector} from "react-redux";
import {selectUser} from "../../features/userSlice";
import Footer from "../../Footer";
import Nav from "../../Nav";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader, Checkbox,
    Container,
    Grid,
    makeStyles,
    Typography
} from "@material-ui/core";
import './MembershipScreen.css';


const useStyles = makeStyles((theme) => ({
    '@global': {

    },
    card:{
        background: '#252525',
    },
    cardTitle:{
        color: '#fff',
    },
    cardHeader: {
        color: '#fff',
    },
    cardPricing: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'baseline',
        marginBottom: theme.spacing(2),
        color: '#fff',
    },
    cardDescription: {
        display: 'flex',
        listStyle: 'none',
        justifyContent: 'center',
        alignItems: 'baseline',
        marginBottom: theme.spacing(2),
        color: '#fff',
    },
    cardCheck: {
        textAlign: 'center',
        marginBottom: theme.spacing(2),
        justifyContent: 'center',
        color: '#fff',
    }
}));

const tiers = [
    {
        title: 'Bronze',
        price: '4500',
        description: ['게임 할인 쿠폰 3장 제공',],
        buttonText: 'Sign up for free',
        buttonVariant: 'outlined',
    },
    {
        title: 'Silver',
        price: '6500',
        description: ['게임 할인 쿠폰 3장 제공',],
        buttonText: 'Get started',
        buttonVariant: 'contained',
    },
    {
        title: 'Gold',
        price: '9900',
        description: ['게임 할인 쿠폰 3장 제공',],
        buttonText: 'Contact us',
        buttonVariant: 'outlined',
    },
];


function MembershipScreen() {
    const classes = useStyles();
    const user = useSelector(selectUser);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
        return () => {
            setLoading(true);
        }
    }, []);

    if(loading) return (<div>Loading...</div>);
    return (
        <>
            <div className="membershipScreen">
                <Nav />
                <div className="membershipScreen_body">
                    <h2>멤버쉽</h2>
                    <div className="membershipScreen_result">
                        {/*<Container maxWidth="md" component="main">
                            <Grid container spacing={5} alignItems="flex-end">
                                {tiers.map((tier) => (
                                    // Enterprise card is full width at sm breakpoint
                                    <Grid item key={tier.title} xs={12} sm={tier.title === 'Enterprise' ? 12 : 6} md={4}>
                                        <Card className={classes.card}>
                                            <CardHeader
                                                className={classes.cardTitle}
                                                title={tier.title}
                                                titleTypographyProps={{ align: 'center' }}
                                            />
                                            <CardContent>
                                                <ul className={classes.cardDescription}>
                                                    {tier.description.map((line) => (
                                                        <Typography component="li" variant="subtitle1" align="center" key={line}>
                                                            {line}
                                                        </Typography>
                                                    ))}
                                                </ul>
                                                <div className={classes.cardPricing}>
                                                    <Typography component="h2" variant="h3">
                                                        {tier.price}
                                                    </Typography>
                                                    <Typography variant="h6">
                                                        원/월
                                                    </Typography>
                                                </div>
                                            </CardContent>
                                            <CardActions>
                                                <Checkbox
                                                    className={classes.cardCheck}
                                                    color="primary"
                                                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                                                />
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Container>*/}
                        <ul className="membership_group">
                            {tiers.map((tier, index) => (
                                <li className="membership_list">
                                    <div className="membership_item">
                                        <label htmlFor={tier.title}>
                                            <h2 className="membership_name">{tier.title}<br/></h2>
                                            <h3 className="membership_description">{tier.description}<br/></h3>
                                            <h6 className="membership_price">{tier.price}/월</h6>
                                            </label>
                                        <input
                                            key={index}
                                            type="radio"
                                            className="membership_check"
                                            name="membership_selectBtn"
                                            id={tier.title}
                                            value={tier.title}
                                        />
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="membership_submit">
                        <button className="membership_btn">가입하기</button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default MembershipScreen;

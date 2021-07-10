import React from 'react';
import PropTypes from 'prop-types';
import { useParams, useHistory } from "react-router";
import { useQuery } from "react-query";
import { getProduct } from "../api/CatalogAPI";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import {Link} from "react-router-dom";
import Card from "@material-ui/core/Card";
import StyledBadge from "@material-ui/core/Badge";
import Rating from "@material-ui/lab/Rating";
import Button from "@material-ui/core/Button";
import {useDispatch} from "react-redux";
import * as CartDuck from "../../cart/ducks/cart.duck";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";

export function ProductPage(classes) {
    const { id } = useParams();
    const history = useHistory();

    const { data, error, isLoading } = useQuery(["products", id], async () => {
        let { data } = await getProduct(id);
        return data;
    });

    // получим ссылку на метод dispatch объекта store
    const dispatch = useDispatch();
    const addProduct = (product) => dispatch(CartDuck.addItem(product));

  return (
    <div className="page">
        {
            isLoading ? (<div>Loading...</div>) :
                (
                    error ? (<div>{error.message}</div>) :

                        (
                            <Card className={classes.card} style={{width:'1000px',height:'500px',margin:'10px 10px 10px 0'}}>

                                <img width="600px" height="200px" src={data.photo}/>
                                <CardContent className={classes.content}>
                                    {
                                        data.isNew ?
                                            (<StyledBadge badgeContent={"New"} color="secondary">
                                                <Typography
                                                    className={"MuiTypography--heading"}
                                                    variant={"h6"}
                                                    gutterBottom
                                                >
                                                    {data.title}
                                                </Typography>
                                            </StyledBadge>) :
                                            (
                                                <Typography
                                                    className={"MuiTypography--heading"}
                                                    variant={"h6"}
                                                    gutterBottom
                                                >
                                                    {data.title}
                                                </Typography>
                                            )
                                    }
                                    <Divider className={classes.divider} light />

                                    <Typography
                                        className={"MuiTypography--subheading"}
                                        variant={"caption"}
                                    >
                                        {data.description}
                                    </Typography>
                                    <Divider className={classes.divider} light />
                                    {
                                        data.isNew ?
                                            (<StyledBadge badgeContent={"Sale"} color="secondary">
                                                <Typography
                                                    className={"MuiTypography--subheading"}
                                                    variant={"caption"}
                                                >
                                                    Price: {data.price} USD <span style={{width:'50px',color:'white'}}>__</span>
                                                </Typography>
                                            </StyledBadge>) :

                                            (<Typography
                                                className={"MuiTypography--subheading"}
                                                variant={"caption"}
                                            >
                                                Price: {data.price} USD
                                            </Typography>)
                                    }
                                    <Divider className={classes.divider} light />

                                    <Rating name="size-medium" defaultValue={data.rating/20} />

                                    <Divider className={classes.divider} light />
                                    {
                                        data.isInStock ?
                                            (
                                                <Button onClick={() => addProduct(data)} exact component={Link} variant="contained" color="primary">
                                                    Добавить в корзину
                                                </Button>
                                            ) :
                                            (
                                                <Button variant="contained" disabled>
                                                    Нет в наличии
                                                </Button>
                                            )

                                    }

                                    <Divider className={classes.divider} light />
                                    <Typography
                                        className={"MuiTypography--heading"}
                                        variant={"caption"}
                                    >
                                        Categories: {[...data.categories]}
                                    </Typography>

                                    <Divider className={classes.divider} light />



                                </CardContent>


                            </Card>







                        )
                )
        }

    </div>
  );
}

ProductPage.propTypes = {};

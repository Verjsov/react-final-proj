import React, {useEffect,useLayoutEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-query';
import { getList } from "../api/CatalogAPI";
import { getCategories } from "../api/CatalogAPI";
import Card from '@material-ui/core/Card';
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import {Link, NavLink} from 'react-router-dom';
import StyledBadge from '@material-ui/core/Badge';
import Rating from '@material-ui/lab/Rating';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Slider from '@material-ui/core/Slider';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import {useDispatch, useSelector} from "react-redux";
import * as CatalogDuck from "../ducks/catalog.duck";
import * as CartDuck from "../../cart/ducks/cart.duck";
import {Accordion, AccordionDetails, AccordionSummary} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import {selectIsLoading} from "../ducks/catalog.duck";


function ExpandMoreIcon() {
    return null;
}

export function CatalogPage(classes) {
    const [catalog,setCatalog] = useState([]);
    const [allData,setAllData] = useState([]);
    const [categoriesNew,setCategoriesNew] = useState([]);
    const [mainCheckboxState,setMainCheckboxState] = useState(false);
    const [expanded, setExpanded] = useState(false);
    //const dataCat = useSelector(CatalogDuck.selectData);

    const loadCategory = useSelector(CatalogDuck.selectIsLoading);


    const [categories,setCategories] = useState(useSelector(CatalogDuck.selectCats));
    const [categoriesNames,setCategoriesNames] = useState(useSelector(CatalogDuck.selectCatsName));
    const [chosenCategories,setChosenCategories] = useState(useSelector(CatalogDuck.selectCats));
    const [categoriesStates,setCategoriesStates] = useState(useSelector(CatalogDuck.selectCatsState));

/*
    if (!loadCategory && dataCat !== null){
        dataCat.forEach(function(category){
            cats.push(category.id);
            catsNames.push(category.name);
        });
        cats.forEach(function(cat,i){
            let st = {
                id:cat,
                state: false,
            };
            catStates.push(st);
        });
    }

 */

    const { data,error,isLoading } = useQuery("products", async () => {
        let { data } = await getList();
        setAllData(data);
        setCatalog(data);
    });



    const dispatch = useDispatch();
    const [isInStore,setIsInStore] = useState(false);
    const [isSale,setIsSale] = useState(false);
    const [isNew,setIsNew] = useState(false);
    const [text,setText] = useState('');
    const [priceRange, setPriceRange] = useState([0, 1000]);
    const [ratingRange, setRatingRange] = useState([0, 100]);

    const addProduct = (product) => dispatch(CartDuck.addItem(product)); // сгенерируем функции для действий


    const handleChangeIsInStore = () => {
        setIsInStore(!isInStore);
    }
    const handleChangeIsSale = () => {
        setIsSale(!isSale);
    }
    const handleChangeIsNew = () => {
        setIsNew(!isNew);
    }
    const handlePriceRangeChange = (event, newValue) => {
        setPriceRange(newValue);
    };
    const handleRatingRangeChange = (event, newValue) => {
        setRatingRange(newValue);
    };
    const handleChangeText = (event) => {
        let { target } = event,
            val = target.value;
        setText(val);
    }


    function valuetext(value) {
        return `${value}°`;
    }

    const handleCheckboxChange = (event) => {
        let { target } = event,
            name = target.name; //название категории
            let ind = categoriesNames.indexOf(name);
            let category_id = categories[ind];
            let val = target.checked;

        let catStates = categoriesStates;

        let index = catStates.findIndex((catState) => catState.id === category_id);
        catStates[index].state = val;
        setCategoriesStates(catStates);

        let chosen = [];
        catStates.forEach(function(catState){
           if (catState.state === true){
               chosen.push(catState.id);
           }
        });
        setChosenCategories(chosen);

    }

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const handleMainCheckboxChange = (event) => {
        let { target } = event;
        let name = target.name;
        let val = target.checked;
        let flag = !val;
        setMainCheckboxState(val);
        let catStates = [];
        let cats = categories;
        cats.forEach(function(cat){
            let st = {
                id:cat,
                state:flag
            };
            catStates.push(st);
        });
        setCategoriesStates(catStates);

        if (flag === true){
            setChosenCategories(categories);
        } else {
            setChosenCategories([]);
        }

    }

    return (
        <div className="page">
            { isLoading && isLoading ?
                <div>Loading...</div>
                : error ?
                    <div>Something went wrong...</div>
                    :
                    <div>

                        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                            >
                                <Typography style={{margin: "auto"}} className={classes.secondaryHeading}>Filters</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Container>
                                    <TextField id="outlined-basic" label="Поиск" variant="outlined" onBlur={handleChangeText}/>
                                </Container>
                                <Container>
                                    <FormGroup>
                                        <div style={{width:'300px',float:'left',margin:'0 50px 0 0'}}>
                                            <Typography id="range-slider" gutterBottom>
                                                Ценовой диапазон
                                            </Typography>
                                            <Slider
                                                value={priceRange}
                                                min={0}
                                                max={1000}
                                                onChange={handlePriceRangeChange}
                                                valueLabelDisplay="auto"
                                                getAriaValueText={valuetext}
                                            />
                                        </div>

                                        <div style={{width:'300px',margin:'0 50px 0 0',float:'left'}}>
                                            <Typography id="range-slider" gutterBottom>
                                                Рейтинг
                                            </Typography>
                                            <Slider
                                                value={ratingRange}
                                                min={0}
                                                max={100}
                                                onChange={handleRatingRangeChange}
                                                valueLabelDisplay="auto"
                                                getAriaValueText={valuetext}
                                            />
                                        </div>

                                        <div style={{clear:'both'}}></div>
                                        <Typography id="range-slider" gutterBottom>
                                            <div style={{height:'20px'}}>Категории</div>
                                        </Typography>

                                        <label>
                                            Снять/Выделить все
                                            <input type="checkbox" checked={mainCheckboxState} onChange={handleMainCheckboxChange} name="main"/>
                                        </label>
                                        <div style={{width:'500px'}}></div>
                                        {


                                            (categoriesStates.length > 0) &&
                                            categoriesNames.map((cat,i) => (
                                                <label key={i}>
                                                    {cat}
                                                    <input key={cat}
                                                           style={{margin:'0 20px 0 0'}}
                                                           type="checkbox"
                                                           checked={categoriesStates[i].state}
                                                           onChange={handleCheckboxChange}
                                                           name={cat}

                                                    />
                                                </label>
                                            ))
                                        }

                                    </FormGroup>
                                </Container>
                                <Container>
                                    <FormGroup>
                                        <FormControlLabel
                                            control={<Switch size="small" onChange={handleChangeIsInStore} />}
                                            label="Есть в наличии"
                                        />
                                        <FormControlLabel
                                            control={<Switch size="small" onChange={handleChangeIsSale} />}
                                            label="Распродажа"
                                        />
                                        <FormControlLabel
                                            control={<Switch size="small" onChange={handleChangeIsNew} />}
                                            label="Новинка"
                                        />
                                    </FormGroup>
                                </Container>
                            </AccordionDetails>
                        </Accordion>
                        {

                            catalog.filter(function (product) {
                                if (isInStore === true){
                                    return product.isInStock === true;}
                                else return true;
                            }).filter(function (product) {
                                if (isSale === true){
                                    return product.isSale === true;}
                                else return true;
                            }).filter(function (product) {
                                if (isNew === true){
                                    return product.isNew === true;}
                                else return true;
                            }).filter(function (product) {
                                if (product.price >= priceRange[0] && product.price <= priceRange[1]) return true;
                                else return false;
                            }).
                            filter(function (product) {
                                if (product.rating >= ratingRange[0] && product.rating <= ratingRange[1]) return true;
                                else return false;
                            }).filter(function (product) {
                                if (text !== ''){
                                    return product.title.indexOf(text) > -1;}
                                else return true;
                            }).filter(function (product) {
                                let flag = false;
                                product.categories.forEach(function(cat){
                                    if (chosenCategories.includes(cat)){
                                        flag = true;
                                    }
                                });
                                return flag;
                            }).

                            map((product) => (

                                <div key={product.id}>{
                                    <Card className={classes.card} style={{width:'350px',height:'500px',margin:'10px 10px 10px 0',float:'left'}}>

                                        <img width="350px" height="200px" src={product.photo}/>
                                        <CardContent className={classes.content}>
                                            {
                                                product.isNew ?
                                                    (<StyledBadge badgeContent={"New"} color="secondary">
                                                        <Typography
                                                            className={"MuiTypography--heading"}
                                                            variant={"h6"}
                                                            gutterBottom
                                                        >
                                                            {product.title}
                                                        </Typography>
                                                    </StyledBadge>) :
                                                    (
                                                        <Typography
                                                            className={"MuiTypography--heading"}
                                                            variant={"h6"}
                                                            gutterBottom
                                                        >
                                                            {product.title}
                                                        </Typography>
                                                    )
                                            }
                                            <Divider className={classes.divider} light />

                                            <Typography
                                                className={"MuiTypography--subheading"}
                                                variant={"caption"}
                                            >
                                                {product.description}
                                            </Typography>
                                            <Divider className={classes.divider} light />
                                            {
                                                product.isSale ?
                                                    (
                                                        <Typography className={"MuiTypography--subheading"} variant={"caption"}>
                                                            Price: {product.price} USD <span style={{width:'50px',color:'white'}}>__</span>
                                                            <StyledBadge style={{margin: "0px 0px 4px 10px"}} badgeContent={"Sale"} color="secondary">
                                                            </StyledBadge>
                                                        </Typography>
                                                   ) :
                                                    (<Typography className={"MuiTypography--subheading"} variant={"caption"}>
                                                        Price: {product.price} USD
                                                    </Typography>)
                                            }
                                            <Divider className={classes.divider} light />

                                            <Rating name="size-medium" defaultValue={product.rating/20} />

                                            <Divider className={classes.divider} light />
                                            <Typography
                                                className={"MuiTypography--subheading"}
                                                variant={"caption"}
                                            >
                                                Categories:
                                            }
                                            </Typography>
                                            <Divider className={classes.divider} light />
                                            <Button component={Link} variant="contained" color="primary">
                                            <Link to={`/products/${product.id}`}>
                                                    More info
                                            </Link>
                                            </Button>
                                            {
                                                product.isInStock ?
                                                    (
                                                        <Button onClick={() => addProduct(product)} exact component={Link} variant="contained" color="primary">
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
                                        </CardContent>


                                    </Card>




                                }   </div>
                            ))

                        }
                    </div>


            }


        </div>
    );
}

CatalogPage.propTypes = {};
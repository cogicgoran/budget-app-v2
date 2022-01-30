import React from 'react';
import styles from './DashboardCategories.module.css';
import { useTranslation } from 'react-i18next';
import DashboardLatestCategory from './dashboard-latest-category/DashboardLatestCategory';
import * as fontAwesomeSolidIcons from '@fortawesome/free-solid-svg-icons';

const appleCategory = {
    category:"FOOD",
    icon: fontAwesomeSolidIcons.faAppleAlt,
    color:"#876445",
    textColor:"#FFF"
}

const carCategory = {
    category:"CAR",
    icon: fontAwesomeSolidIcons.faCar,
    color:"#6867AC",
    textColor:"#FFF"
}

const cartCategory = {
    category:"SHOPPING",
    icon: fontAwesomeSolidIcons.faShoppingCart,
    color:"#99A799",
    textColor:"#000"
}

const healthCategory = {
    category:"HEALTH",
    icon: fontAwesomeSolidIcons.faShoppingCart,
    color:"#99A799",
    textColor:"#000"
}

const iceCreamCategory = {
    category:"ICECREAM",
    icon: fontAwesomeSolidIcons.faShoppingCart,
    color:"#99A799",
    textColor:"#000"
}

// fontAwesomeSolidIcons.faAppleAlt
// fontAwesomeSolidIcons.faBaby
// fontAwesomeSolidIcons.faBabyCarriage
// fontAwesomeSolidIcons.faBook
// fontAwesomeSolidIcons.faCarrot
// fontAwesomeSolidIcons.faCar
// fontAwesomeSolidIcons.faCat
// fontAwesomeSolidIcons.faCocktail
// fontAwesomeSolidIcons.faFootball
// fontAwesomeSolidIcons.faHeadSideMask
// fontAwesomeSolidIcons.faHeadphones
// fontAwesomeSolidIcons.faHeart
// fontAwesomeSolidIcons.faHome
// fontAwesomeSolidIcons.faIceCream
// fontAwesomeSolidIcons.faLemon
// fontAwesomeSolidIcons.faKitMedical
// fontAwesomeSolidIcons.faPaw
// fontAwesomeSolidIcons.faFootballBall
// fontAwesomeSolidIcons.faShoppingCart
// fontAwesomeSolidIcons.faTelevision


// #6867AC
// #CE7BB0
// #9D5353
// #632626
// #876445

// #CA965C
// #92A9BD
// #7C99AC
// #A68DAD
// #8E806A

// #B983FF
// #FF87CA
// #C6D57E
// #316B83
// #9E7777

// #F6AE99
// #B5CDA3
// #C1AC95
// #3A6351
// #876445

function DashboardCategories() {
    const { t } = useTranslation();
    const textCategories = t('categories');
    
    return (
        <div className={styles['dashboard-categories-wrapper']}>
            <h2>{textCategories}</h2>
            <div className={styles['dashboard-categories']}>
                <DashboardLatestCategory {...appleCategory} />
                <DashboardLatestCategory {...carCategory} />
                <DashboardLatestCategory {...cartCategory} />
            </div>
        </div>
    );
};

export default DashboardCategories;

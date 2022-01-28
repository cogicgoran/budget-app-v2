import React, { useState } from 'react';
import PageTitle from 'components/helper/PageTitle';
import MainCard from 'components/UI/MainCard';
import { useUnauthenticatedRedirect } from 'hooks/use-redirect/useAuthRedirect';


function Categories() {
  return (
    <div>
      <PageTitle title="Categories"/>
      <MainCard>
        
      </MainCard>
    </div>
  );
};

export default Categories;

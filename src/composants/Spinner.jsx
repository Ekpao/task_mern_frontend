import React from 'react';

const Spinner = ()=> {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="relative flex items-center justify-center">
        {/* Cercle de fond (piste) discret */}
        <div className="w-12 h-12 border-4 border-indigo-100 rounded-full"></div>
        
        {/* Cercle animé (le spinner) calqué sur la couleur de tes formulaires */}
        <div className="absolute w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  );
}

export default Spinner
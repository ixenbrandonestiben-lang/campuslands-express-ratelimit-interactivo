export let autosDeportivos = [
  {
    id: 1,
    modelo: "Porsche 911 GT3 RS",
    marca: "Porsche",
    potenciaHp: 518,
    precio: 241300
  },
  {
    id: 2,
    modelo: "Ferrari 296 GTB",
    marca: "Ferrari",
    potenciaHp: 830,
    precio: 342200
  },
  {
    id: 3,
    modelo: "Lamborghini Huracán Tecnica",
    marca: "Lamborghini",
    potenciaHp: 631,
    precio: 239000
  },
  {
    id: 4,
    modelo: "Chevrolet Corvette Z06",
    marca: "Chevrolet",
    potenciaHp: 670,
    precio: 112700
  }
];
 
export function reiniciarAutosDeportivos() {
  autosDeportivos.length = 0;
  autosDeportivos.push(
    {
      id: 1,
      modelo: "Porsche 911 GT3 RS",
      marca: "Porsche",
      potenciaHp: 518,
      precio: 241300
    },
    {
      id: 2,
      modelo: "Ferrari 296 GTB",
      marca: "Ferrari",
      potenciaHp: 830,
      precio: 342200
    },
    {
      id: 3,
      modelo: "Lamborghini Huracán Tecnica",
      marca: "Lamborghini",
      potenciaHp: 631,
      precio: 239000
    },
    {
      id: 4,
      modelo: "Chevrolet Corvette Z06",
      marca: "Chevrolet",
      potenciaHp: 670,
      precio: 112700
    }
  );
  return autosDeportivos;
}
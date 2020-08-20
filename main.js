// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G']
  return dnaBases[Math.floor(Math.random() * 4)] 
}

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = []
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase())
  }
  return newStrand
}

let pAequorFactory = (specimenNum) => {
  return {
    specimenNum,
    dna: mockUpStrand(),
    mutate() {
      let newBase = returnRandBase();
      let mutatingBaseIndex = Math.floor(Math.random()*15);
      while (newBase === this.dna[mutatingBaseIndex]) {
        newBase = returnRandBase();
      }
      this.dna[mutatingBaseIndex] = newBase;
      return this.dna
    },
    compareDNA(sp2) {
      let sp1 = this;
      let sameCount = 0;
      let perc = 0;
      sp1.dna.forEach((base, i) => {
        if (sp1.dna[i] === sp2.dna[i]) {
          sameCount++ 
        }
      })
      perc = ((sameCount / sp1.dna.length) * 100).toFixed(1);
      return sameCount;
      //console.log(`Specimen #${sp1.specimenNum} and specimen #${sp2.specimenNum} have ${perc}% of their DNA in common`)
      },
    willLikelySurvive() {
      let count = 0;
      this.dna.forEach(base => {
        if (base === 'C' || base === 'G') {
          count ++
        }
      });
      return ((count / this.dna.length) * 100 >= 60)
    },
    complementStrand() {
        let complement = [];
        this.dna.forEach(el => {
          console.log(el)
          switch (el){
          case 'T':
            complement.push('A')
            break;
          case 'A':
            complement.push('T')
            break;
          case 'G':
            complement.push('C')
            break;
          case 'C':
            complement.push('G')
            break;}
          
        })
        return complement;
      },
    }
    
}


let makeSamplePopulation = (popSize) => {
  let i = 0;
  let population = [];
  while (population.length < popSize) {
    i ++;
    if (pAequorFactory(i).willLikelySurvive()){
    population.push(pAequorFactory(i))
    }
  }
  return population;
}

let twoMostRelated = (population) => {
  let pairsCompared = [];
  for (let i = 0; i < population.length; i++){
    for (let j = i+1; j < population.length; j++){
      
      pairsCompared.push([i,j,goodSpecimen[i].compareDNA(goodSpecimen[j])])
    }
  }
  let mostRelated = [0,0,0];
  pairsCompared.forEach(el => {
     if (mostRelated[2] < el[2]){
      mostRelated = el;
    }
  })

return mostRelated;
}
let reportMostRelated = (population) => {
  console.log(`The most related specimen are #${population[twoMostRelated(population)[0]].specimenNum} and #${population[twoMostRelated(population)[1]].specimenNum}. They have ${((twoMostRelated(population)[2] / 15) * 100).toFixed(1)}% if their genes in common`)
}

let goodSpecimen = makeSamplePopulation(1000);
reportMostRelated(goodSpecimen)












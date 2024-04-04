let participantes = [
  {
    nome: 'Beyoncé Knowles',
    email: 'beyonce@email.com',
    dataInscricao: new Date(2024, 2, 22, 19, 20),
    dataCheckIn: new Date(2024, 2, 25, 22, 20)
  },
  {
    nome: 'Justin Bieber',
    email: 'justin@email.com',
    dataInscricao: new Date(2024, 2, 23, 19, 20),
    dataCheckIn: new Date(2024, 2, 25, 21, 30)
  },
  {
    nome: 'Miley Cyrus',
    email: 'miley@email.com',
    dataInscricao: new Date(2024, 2, 21, 18, 45),
    dataCheckIn: new Date(2024, 2, 25, 20, 30)
  },
  {
    nome: 'Rihanna Fenty',
    email: 'rihanna@email.com',
    dataInscricao: new Date(2024, 2, 24, 20, 15),
    dataCheckIn: null
  },
  {
    nome: 'Shawn Mendes',
    email: 'shawn@email.com',
    dataInscricao: new Date(2024, 2, 23, 12, 30),
    dataCheckIn: new Date(2024, 2, 26, 9, 45)
  },
  {
    nome: 'Michael Jackson',
    email: 'michael@email.com',
    dataInscricao: new Date(2024, 2, 22, 17, 40),
    dataCheckIn: new Date(2024, 2, 26, 8, 20)
  },
  {
    nome: 'Katy Perry',
    email: 'katy@email.com',
    dataInscricao: new Date(2024, 2, 21, 21, 10),
    dataCheckIn: new Date(2024, 2, 25, 19, 30)
  },
  {
    nome: 'Ariana Grande',
    email: 'ariana@email.com',
    dataInscricao: new Date(2024, 2, 24, 18, 20),
    dataCheckIn: new Date(2024, 2, 26, 12, 15)
  },
  {
    nome: 'Selena Gomez',
    email: 'selena@email.com',
    dataInscricao: new Date(2024, 2, 22, 22, 50),
    dataCheckIn: new Date(2024, 2, 25, 23, 45)
  },
  {
    nome: 'Camila Cabello',
    email: 'camila@email.com',
    dataInscricao: new Date(2024, 2, 23, 14, 15),
    dataCheckIn: null
  },
];

const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now())
  .to(participante.dataInscricao)

  let dataCheckIn = dayjs(Date.now())
  .to(participante.dataCheckIn)

  if(participante.dataCheckIn == null) {
    dataCheckIn = `<button data-email="${participante.email}" onclick="fazerCheckIn(event)">Confirmar Check-in</button>`
  }
  
  return `
  <tr>
    <td>
      <strong>
        ${participante.nome}
      </strong>
      <br>
      <small>
        ${participante.email}
      </small>
    </td>
    <td>${dataInscricao}</td>
    <td>${dataCheckIn}</td>
  </tr>
  `
}

const atualizarLista = (participantes) => {
  let output = ""
  for(let participante of participantes) {
    output = output + criarNovoParticipante(participante)
  }

  document
  .querySelector('tbody')
  .innerHTML = output
}

atualizarLista(participantes)

const adicionarParticipante = (event) => {
  event.preventDefault()

  const dadosdoFormulario = new FormData(event.target)

  const participante = {
    nome: dadosdoFormulario.get('nome'),
    email: dadosdoFormulario.get('email'),
    dataInscricao: new Date(),
    dataCheckIn: null
  }

  const participanteExiste = participantes.find(
    (p) => p.email == participante.email
  )

  if(participanteExiste){
    alert('E-mail já cadastrado!')
    return
  }

  participantes = [participante, ...participantes]

  atualizarLista(participantes)

 event.target.querySelector('[name="nome"]').value = ""
 event.target.querySelector('[name="email"]').value = ""
}

const fazerCheckIn = (event) => {
  const mensagemConfirmacao = 'Tem certeza que deseja realizar o check-in?'
  if(confirm(mensagemConfirmacao) == false) {
    return
  }

  const participante = participantes.find(
    (p) => p.email == event.target.dataset.email
  )
  
  participante.dataCheckIn = new Date(),

  atualizarLista(participantes)
}
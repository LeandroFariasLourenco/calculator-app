module.exports = {
  types: [
    { value: 'feat', name: 'feat:       Uma nova funcionalidade' },
    { value: 'fix', name: 'fix:        Ajuste de bug' },
    { value: 'chore', name: 'chore:      Alterações em arquivos fora da pasta src' },
    { value: 'docs', name: 'docs:       Alterações de documentações' },
    { value: 'style', name: 'style:      Alterações que não alteram funcionamento do código' },
    { value: 'revert', name: 'revert:     Reversões no código para uma versão anterior' },
    { value: 'test', name: 'test:       Implementação de teste ou alteração' },
    { value: 'refactor', name: 'refactor:   Alterações de código para melhorias' },
  ],

  messages: {
    type: 'Selecione o tipo de alteração que está sendo realizada',
    customScope: 'Escreva o escopo da alteração (ex: pessoa)',
    subject: 'Escreva uma breve mensagem descrevendo sua alteração',
    confirmCommit: 'Tem certeza que deseja prosseguir com o commit acima? (Enter para continuar, "n" para cancelar)',
  },

  skipQuestions: ['body', 'breaking', 'footer'],

  subjectLimit: 150,
}
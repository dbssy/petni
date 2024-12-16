export function formatPhone(value: string) {
  const phone = value.replace(/\D/g, '');
  return phone.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
}

export function formatGender(gender: string) {
  return gender === 'male' ? 'Macho' : 'Fêmea';
}

export function formatCurrency(value: number) {
  return Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

export function formatPaymentType(paymentType: string) {
  const paymentTypeMap = {
    CREDIT_CARD: 'Cartão de Crédito',
    DEBIT_CARD: 'Cartão de Débito',
    PIX: 'Pix',
    MONEY: 'Dinheiro',
    ANOTHER: 'Outras Maneiras',
  };

  return (
    paymentTypeMap[paymentType as keyof typeof paymentTypeMap] || 'Desconhecido'
  );
}

export function formatStatusType(statusType: string) {
  const statusTypeMap = {
    WAITING: 'Aguardando início',
    IN_PROGRESS: 'Em andamento',
    DONE: 'Finalizado',
    CANCELED: 'Cancelado',
    AWAITING_PAYMENT: 'Aguardando pagamento',
    PAID: 'Pago',
  };

  return (
    statusTypeMap[statusType as keyof typeof statusTypeMap] || 'Desconhecido'
  );
}

export function formatDate(date: Date) {
  return Intl.DateTimeFormat('pt-br').format(date);
}

export function formatDuration(durationInSeconds: number | null) {
  const totalSeconds = durationInSeconds ?? 0;

  const units = [
    { label: 'dia', value: Math.floor(totalSeconds / (60 * 60 * 24)) },
    {
      label: 'hora',
      value: Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60)),
    },
    {
      label: 'minuto',
      value: Math.floor((totalSeconds % (60 * 60)) / 60),
    },
    { label: 'segundo', value: totalSeconds % 60 },
  ];

  const formattedDuration = units
    .filter((unit) => unit.value > 0)
    .map((unit) => `${unit.value} ${unit.label}${unit.value > 1 ? 's' : ''}`)
    .join(', ');

  return `${formattedDuration || 'Não iniciado'}`;
}

export function formatHours(totalSeconds: number) {
  const totalMinutes = Math.floor(totalSeconds / 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  let result = '';

  if (hours > 0) {
    result += `${hours} hora${hours > 1 ? 's' : ''}`;
  }

  if (minutes > 0) {
    if (result) {
      result += ' e ';
    }

    result += `${minutes} minuto${minutes > 1 ? 's' : ''}`;
  }

  return result || '0 horas';
}

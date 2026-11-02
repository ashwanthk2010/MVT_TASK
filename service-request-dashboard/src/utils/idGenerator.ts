let requestSequence = 0;

export function initRequestSequence(startAt: number): void {
  requestSequence = startAt;
}

export function generateRequestId(): string {
  requestSequence += 1;
  return `REQ-${String(requestSequence).padStart(4, '0')}`;
}

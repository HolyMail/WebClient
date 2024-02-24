type Email = {
    uniqueId: number,
    from: string,
    to: string,
    subject: string,
    dateTime: Date,
    folder: string,
    isReply: boolean,
    previewText: string,
}
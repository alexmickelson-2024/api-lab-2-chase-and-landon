using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors();

var app = builder.Build();

app.UseCors(
    p => {
        p.AllowAnyHeader()
        .AllowAnyOrigin()
        .AllowAnyMethod();
    }
);

var storageRoot = "./storage";
if (!Directory.Exists(storageRoot)) {
    Directory.CreateDirectory(storageRoot);
}

app.MapGet("/", () => "Hello World!");

app.MapPost("/messages", async (Message comment) => {
    Console.WriteLine("Posting message...");
    var pagePath = Path.Combine(storageRoot, comment.Id.ToString());
    Directory.CreateDirectory(pagePath);

    var pageFile = Path.Combine(pagePath, "Message.json");
    await File.WriteAllTextAsync(pageFile, JsonSerializer.Serialize(comment));
});

app.MapGet("/messages", () => {
    var comments = Directory.GetDirectories(storageRoot)
    .Select(pageDir =>
    {
        var pageFile = Path.Combine(pageDir, "Message.json");
        if (!File.Exists(pageFile)) return null;
        var page = JsonSerializer.Deserialize<Message>(File.ReadAllText(pageFile));
        return page;
    })
    .Where(b => b != null);

    return comments;
});

app.Run();

public record Message(ulong Id, string Text, ulong? ParentId);
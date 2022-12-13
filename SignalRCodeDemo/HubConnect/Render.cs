using Microsoft.AspNetCore.SignalR;

namespace SignalRCodeDemo.HubConnect
{
    public class Render:Hub
    {
        public async Task JoinGroup(string groupName)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
        }
        public async Task Send(string groupName,Object mess)
        {
            Console.WriteLine(groupName);
            Console.WriteLine("Mess: "+mess);
            await Clients.OthersInGroup(groupName).SendAsync("Send",mess);
        }
        public Task LeaveGroup(string roomName)
        {
            return Groups.RemoveFromGroupAsync(Context.ConnectionId, roomName);
        }
        public async Task SendMessage(string user)
        {
            Console.WriteLine(user);
            await Clients.All.SendAsync("ReceiveMessage", user);
        }


    }
}

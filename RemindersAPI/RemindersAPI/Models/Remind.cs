using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RemindersAPI.Models
{
    public class Remind
    {
        public int Id { get; set; }
        public string Subject { get; set; }
        public string Content { get; set; }
        public int DaysLeft { get; set; }
    }
}
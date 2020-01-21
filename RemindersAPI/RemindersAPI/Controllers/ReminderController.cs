using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using RemindersAPI.Models;
using RemindersAPI.Entities;

namespace RemindersAPI.Controllers
{
    [RoutePrefix("api/reminders")]
    public class ReminderController : ApiController
    {
        RemindersEntities DB = new RemindersEntities();

        //Create New Reminder || Edit Reminder
        [HttpPost]
        [Route("createRemind")]
        public object CreateReminder(ReminderVM r)
        {
            try {
                if (r.Id == 0)
                {
                    Reminder rem = new Reminder();
                    rem.Subject = r.Subject;
                    rem.Content = r.Content;
                    rem.DaysLeft = r.DaysLeft;
                    DB.Reminders.Add(rem);
                    DB.SaveChanges();
                    return new Response
                    {
                        Status = "Success",
                        Message = "New Reminder Was Added To DB"
                    };
                }
                else
                {
                    var obj = DB.Reminders.Where(x => x.Id == r.Id).ToList().FirstOrDefault();
                    if (obj.Id > 0)
                    {
                        obj.Subject = r.Subject;
                        obj.Content = r.Content;
                        obj.DaysLeft = r.DaysLeft;
                        DB.SaveChanges();
                        return new Response { Status = "Updated", Message = "Updated Successfully" };
                    }
                }
            
            }catch(Exception ex) 
            {
                Console.Write(ex.Message);
            };
            return new Response
            {
                Status = "Error", Message = "Data Not Inserted!"
            };


        }

        //Get ReminderS
        [HttpGet]
        [Route("getReminders")]
        public object GetReminders()
        {
            var data = DB.Reminders.ToList();
            return data;
        }

        //Get Specific Reminder
        [HttpGet]
        [Route("getReminder")]
        public object GetReminder(int id)
        {
            var remind = DB.Reminders.Where(x => x.Id == id).ToList().FirstOrDefault();
            return remind;
        }

        //Delete Specific Reminder
        [HttpDelete]
        [Route("deleteReminder")]
        public object DeleteReminder(int id)
        {
            var remind = DB.Reminders.Where(x => x.Id == id).ToList().FirstOrDefault();
            DB.Reminders.Remove(remind);
            DB.SaveChanges();
            return new Response { Status = "Success", Message = "Reminder Deleted Successfully" };
        }
    }
}

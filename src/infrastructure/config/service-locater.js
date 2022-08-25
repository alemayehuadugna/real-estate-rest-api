'use strict';

const constants = require('./constants');
const environment = require('./environment');
const JwtAccessTokenManager = require('../security/JwtAccessTokenManager');
const UserSerializer = require('../../interface/serializers/UserSerializer');
const PropertySerializer = require('../../interface/serializers/PropertySerializer');
const LeadSerializer = require('../../interface/serializers/LeadSerializer');
const PropertyReviewSerializer = require('../../interface/serializers/PropertyReviewSerializer');
const BookingSerializer = require('../../interface/serializers/BookingSerializer');
const FeedbackSerializer = require('../../interface/serializers/FeedbackSerializer');
const RevenueSerializer = require('../../interface/serializers/RevenueSerializer');
const MessageSerializer = require('../../interface/serializers/MessageSerializer');
const ConversationSerializer = require('../../interface/serializers/ConversationSerializer');
const NotificationSerializer = require('../../interface/serializers/NotificationSerializer');
const ReportSerializer = require('../../interface/serializers/ReportSerializer');
const TotalCountSerializer = require('../../interface/serializers/TotalCountSerializer');
const TodoListSerializer = require('../../interface/serializers/TodoListSerializer');
const AgentSerializer = require('../../interface/serializers/AgentSerializer');
const FavoriteSerializer = require('../../interface/serializers/FavoriteSerializer');
const EmployeeSerializer = require('../../interface/serializers/EmployeeSerializer');

function buildBeans() {

    const beans = {
        accessTokenManager: new JwtAccessTokenManager(),
        userSerializer: new UserSerializer(),
        propertySerializer: new PropertySerializer(),
        leadSerializer: new LeadSerializer(),
        propertyReviewSerializer: new PropertyReviewSerializer(),
        bookingSerializer: new BookingSerializer(),
        feedbackSerializer: new FeedbackSerializer(),
        revenueSerializer: new RevenueSerializer(),
        messageSerializer: new MessageSerializer(),
        conversationSerializer: new ConversationSerializer(),
        notificationSerializer: new NotificationSerializer(),
        reportSerializer: new ReportSerializer(),
        totalCountSerializer: new TotalCountSerializer(),
        todoListSerializer: new TodoListSerializer(),
        agentSerializer: new AgentSerializer(),
        favoriteSerializer: new FavoriteSerializer(),
        employeeSerializer: new EmployeeSerializer(),
      
    };

    if (environment.database.dialect === constants.SUPPORTED_DATABASE.MONGO) {
        const UserRepository = require('../repositories/Mongo/UserRepository');
        const PropertyRepository = require('../repositories/Mongo/PropertyRepository');
        const LeadRepository = require('../repositories/Mongo/LeadRepository');
        const PropertyReviewRepository = require('../repositories/Mongo/PropertyReviewRepository');
        const BookingRepository = require('../repositories/Mongo/BookingRepository');
        const FeedbackRepository = require('../repositories/Mongo/FeedbackRepository'); 
        const RevenueRepository = require('../repositories/Mongo/RevenueRepository');
        const MessageRepository = require('../repositories/Mongo/MessageRepository');
        const ConversationRepository = require('../repositories/Mongo/ConversationRepository');
        const NotificationRepository = require('../repositories/Mongo/NotificationRepository');
        const ReportRepository = require('../repositories/Mongo/ReportRepository');
        const TotalCountRepository = require('../repositories/Mongo/TotalCountRepository');
        const TodoListRepository = require('../repositories/Mongo/TodoListRepository');
        const AgentRepository = require('../repositories/Mongo/AgentRepository');
        const FavoriteRepository = require('../repositories/Mongo/FavoriteRepository');
        const EmployeeRepository = require('../repositories/Mongo/EmployeeRepository');
        const ImageRepository = require('../repositories/Mongo/ImageRepository');

        beans.userRepository = new UserRepository();
        beans.propertyRepository = new PropertyRepository();
        beans.leadRepository = new LeadRepository();
        beans.propertyReviewRepository = new PropertyReviewRepository();
        beans.bookingRepository = new BookingRepository();
        beans.feedbackRepository = new FeedbackRepository();
        beans.revenueRepository = new RevenueRepository();
        beans.messageRepository = new MessageRepository();
        beans.conversationRepository = new ConversationRepository();
        beans.notificationRepository = new NotificationRepository();
        beans.reportRepository = new ReportRepository();
        beans.totalCountRepository = new TotalCountRepository();
        beans.todoListRepository = new TodoListRepository();
        beans.agentRepository = new AgentRepository();
        beans.favoriteRepository = new FavoriteRepository();
        beans.employeeRepository = new EmployeeRepository();
        beans.imageRepository = new ImageRepository();
    }

    return beans;
}

module.exports = buildBeans();